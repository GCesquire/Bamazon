var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

const connection = mysql.createConnection({
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

const displayItems = () => {
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Department Name", "Price", "Stock"],
			colWidths: [25,25,25,25,25]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		purchase();
	});
}

const purchase = () => {
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter the Item ID of the product you would like to purhcase.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many of these items do you wish to purchase?",
		filter:Number
	},

]).then(function(answers){
    var quantityNeeded = answers.Quantity;
    var IDrequested = answers.ID;
    purchaseOrder(IDrequested, quantityNeeded);
    });
};

const purchaseOrder = (ID, amtNeeded) => {
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].price * amtNeeded;
			console.log("Your order is in stock!");
			console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost + " Thank you!");
			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
		} else{
			console.log("Sorry we do not have enough " + res[0].product_name + "to complete your order. Please try again!");
		};
		displayItems();
	});
};

displayItems(); 