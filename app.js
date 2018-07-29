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
                yesBuy();
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

function yesBuy(){
    console.log("You wanna buy.");
    inquirer.prompt({
        name: "itemToBuy",
        type: "input",
        message: "What item do you want to buy? Type only the ID number please:"
    }).then(answer => {
        console.log("You want to buy item ID number: " + answer.itemToBuy);
        let itemId = answer.itemToBuy;
        console.log(itemId)
        inquirer.prompt({
            name: "howMany",
            type: "input",
            message: "How many do you want to buy of item #" + itemId + " ?",
        }).then(answer=>{
            let itemQty = answer.howMany
            console.log("You want item #" + itemId + " | " + "Quantity: " + itemQty)
            let checkQty = `SELECT * FROM products WHERE id = ${itemId}`;
            con.query(checkQty, (error, result) => {
                if (error) throw error;
                console.log(result);
            })
            let query = `UPDATE products SET stock_quantity = (stock_quantity - ${itemQty}) WHERE id = ${itemId}`;
            con.query(query, (error, result)=>{
                if (error) throw error;
                console.log(result.stock_quantity);
            })
        })
    })
    
}

function noBuy(){
    console.log("y u no buy?");
    con.end();
}