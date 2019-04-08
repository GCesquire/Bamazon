DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(200) NOT NULL,
	department_name VARCHAR(200) NOT NULL,
	price DECIMAL(10,2),
	stock_quantity INT(20),
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES  (101, "Fender Stratocaster", "Electric Guitars", 1299.99, 20),
        (102, "Gibson Les Paul", "Electric Guitars", 2199.99, 20),
        (201, "Martin D-15 M", "Acoutsitc Guitars", 1299.99, 20),
        (202, "Gibnson Hummingbird", "Acoustic Guitars", 3269.99, 20),
        (301, "Fender Jazz Bass", "Bass Guitars", 1199.99, 20),
        (302, "Fender Precision Bass", "Bass Guitars", 1499.99, 20),
        (401, "Pearl Decade Maple Set", "Percussions", 999.99, 20),
        (402, "Luidwig Classic Maple", "Percussions", 1999.99, 20),
        (501, "Shure SM57", "Microphpnes", 99.99, 20),
        (502, "Shure SM58", "Microphones", 99.99, 20),
        (601, "Moog Subsequent 37 Analog Synthesizer", "Synthesizers", 1499.99,  20),
        (602, "Nord Lead", "Synthesizxer", 1799.99, 20),
        (701, "Roland DJ 808", "DJ Controllers", 1199.99, 20),
        (702, "Native Instruments Traktor Control", "DJ Controller", 1199.99, 20)