const mysql = require("mysql");
const inquirer = require("inquirer")

// Connection settings
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon",
    port: 3306,
})

// Connect
con.connect((error)=>{
    if (error) throw error;
    console.log("connected!");
    displayItems();
})

// Display all of the items avaliable for purchase
function displayItems(){
con.query("SELECT * FROM products", (error, results)=> {
    if (error) throw error;
    console.log("|--------------------------------------------------|");
    console.log("|---------------Good Boy! Good Buy!----------------|");
    console.log("|--------------------------------------------------|");
    console.log("   _____ _____  ___________  ______  _______   __")
    console.log("  |  __ \\  _  ||  _  |  _  \\ | ___ \\|  _  \\ \\ / /")
    console.log("  | |  \\/ | | || | | | | | | | |_/ /| | | |\\ V / ")
    console.log("  | | __| | | || | | | | | | | ___ \\| | | | \\ /  ")
    console.log("  | |_\\ \\ \\_/ /\\ \\_/ / |/ /  | |_/ /\\ \\_/ / | |  ")
    console.log("   \\____/\\___/  \\___/|___/   \\____/  \\___/  \\_/  ")
    console.log(" ");
    console.log("|--------------------------------------------------|");
    console.log("|--------------------------------------------------|");
    console.log("|--------------------------------------------------|");      

    for (let i = 0; i < results.length; i++) {
        console.log(results[i].id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity);
    }
    console.log("-------------------------------------------");
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "Do you want to buy something?",
        choices: ["YES", "NO"]
    }).then(answer =>{
        switch (answer.options) {
            case "YES":
                buyItem();
                break;
            case "NO":
                noBuy();
                break;
            default:
                displayItems();
        }
    })
})
}

function buyItem(){
    console.log("You wanna buy.");
}

function noBuy(){
    console.log("y u no buy?");
    con.end();
}