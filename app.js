const mysql = require("mysql");

// Connection settings
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon",
    port: 3306,
})

// Connect
con.connect(function(error){
    if (error) throw error;
    console.log("connected!");
    displayItems();
})

// Display all of the items avaliable for purchase
function displayItems(){
con.query("SELECT * FROM products", (error, results) => {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
        console.log(results[i].id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity);
    }
    console.log("-----------------------------------");
    con.end();
})
}