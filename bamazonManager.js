var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

const itemDisplay = () => {
	connection.query('SELECT * FROM Products', function(err, res){
		if(err){console.log(err)};
		var theDisplayTable = new Table({
			head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock'],
			colWidths: [10,25,25,10,14]
		});
		for(i=0; i<res.length;i++){
			theDisplayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(theDisplayTable.toString());
		itemUpdates();
	});
};

const itemUpdates = () => {
	inquirer.prompt([{
		name:"action",
		type: "list",
		message: "Choose an option below to manage inventory:",
		choices: ["Restock", "Add Product", "Remove Product"]
	}]).then(function(answers){
		switch(answers.action){
			case 'Restock':
				restockItem();
				break;
			case 'Add Product':
				addItem();
				break;
			case 'Remove Product':
				removeItem();
				break;		
		}
	});
};

const restockItem = () => {
	inquirer.prompt([
	{
		name:"ID",
		type:"input",
		message:"What is the Item ID of the product you wish to restock?"
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many would like to add?"
	},
	]).then(function(answers){
		var quantityAdded = answers.Quantity;
		var IDOfProduct = answers.ID;
		replenishInventory(IDOfProduct, quantityAdded);
	});
};

const replenishInventory = (id, quant) => {
	connection.query('SELECT * FROM Products WHERE item_id = '+id, function(err,res){
		if(err){console.log(err)};
		connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' +stock_quantity+ 'WHERE item_id =' +item_id);
		itemDisplay();
	});
};

const addItem = () => {
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message: "Add ID Number"
	},	
	{
		name: "Name",
		type: "input",
		message: "What is name of product you would like to stock?"
	},
	{
		name:"Department",
		type:"input",
		message:"What department is this product in?"
	},
	{
		name:"Price",
		type:"input",
		message:"What is the price of this item?"
	},
	{
		name:"Quantity",
		type:"input",
		message:"What is the quantity you would like to add?"
	},
	]).then(function(answers){
		var id = answers.Id;
		var name = answers.Name;
		var category = answers.Category;
		var price = answers.Price;
		var quantity = answers.Quantity;
		newItem(id,name,category,price,quantity); 
	});
};

const newItem = (name,category,price,quantity) => {
    connection.query('INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES("' + id + '","' + name + '","' + category + '",' + price + ',' + quantity +  ')');
    itemDisplay();
};

const removeItem = () => {
    inquirer.prompt([{
        name:"ID",
        type:"input",
        message:"What is the Item ID of the product you would like to remove?"
    }]).then(function(answer){
        var id = answers.ID;
        removeInventory(id); 
    });
};

const removeInventory = (id) => {
    connection.query('DELETE FROM Products WHERE item_id = ' + id);
    itemDisplay();
};

itemDisplay();