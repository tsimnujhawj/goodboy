

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(5, 2),
    stock_quantity INTEGER(10),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Apple Watch 3", "Technology", 399.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Amazon Echo", "Technology", 99.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Folding Chair 10-pack", "Home", 139.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Green Tea", "Grocery", 14.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Coffee", "Grocery", 9.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("The Old Man and The Sea", "Books", 11.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Nerf Gun", "Toys", 16.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Baseball 4-pack", "Sports", 7.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Redwing Boots", "Clothing", 299.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("KONG", "Pet", 9.99, 60);