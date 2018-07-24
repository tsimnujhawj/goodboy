const mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon",
    port: 3306,
})

con.connect(function(error){
    if (error) throw error;
    console.log("connected!");
    connection.end();
})

