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
    console.log(" ");
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
    console.log("|------------------Manager Access------------------|");
    console.log("|--------------------------------------------------|");      
    console.log(" ");
    initialize();
})

function initialize(){
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(answer =>{
        switch (answer.options) {
            case "View Products for Sale":
                displayItems();
                break;
            case "View Low Inventory":
                lowItems();
                break;
            case "Add to Inventory":
                addToInventory()
                break;
            case "Add New Product":
                addNewProduct();
                break;
            default:
                initialize();
        }
    })
};

// Display all of the items avaliable for purchase
function displayItems(){
    con.query("SELECT * FROM products", (error, results)=> {
        if (error) throw error;
        console.log("|--------------------------------------------------|");
        console.log("|----------------Products for Sale-----------------|");
        console.log("|--------------------------------------------------|");
        console.log(" ");
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].id + " | " + results[i].product_name + " | $" + results[i].price + " | Quantity: " + results[i].stock_quantity);
        }
        console.log("|--------------------------------------------------|");
        console.log(" ");
        initialize();
    })
};

function lowItems(){
    let checkLow = "SELECT * FROM products WHERE stock_quantity <= 5";
    con.query(checkLow, (error, results) => {
        if (error) throw error;
        console.log("|--------------------------------------------------|");
        console.log("|------------------Low Inventory-------------------|");
        console.log("|--------------------------------------------------|");
        console.log(" ");
        if (results.length === 0) {
            console.log("You are stocked up!")
        } else {
            for (let i = 0; i < results.length; i++) {
                console.log(results[i].id + " | " + results[i].product_name + " | $" + results[i].price + " | " + results[i].stock_quantity);
            }
        }
        console.log("|--------------------------------------------------|");
        console.log(" ");
        initialize();
     })
}

function addToInventory(){
    console.log("|--------------------------------------------------|");
    console.log("|------------------Add to Inventory----------------|");
    console.log("|--------------------------------------------------|");
    console.log(" ");
    inquirer.prompt({
        name: "itemToBuy",
        type: "input",
        message: "Which item do you want to add to? Type only the ID number please:"
    }).then(answer => {
        let itemId = answer.itemToBuy;
        inquirer.prompt({
            name: "howMany",
            type: "input",
            message: "How many do you want to add to item #" + itemId + " ?",
        }).then(answer => {
            let itemQty = answer.howMany;
            console.log("|--------------------------------------------------|");
            console.log("You want to add " + itemQty + " to item #" + itemId)
            let updateQty = `SELECT * FROM products WHERE id = ${itemId}`;

            con.query(updateQty, (error, result) => {
                if (error) throw error;
            
                let itemNameQuery = result[0].product_name;

                let query = `UPDATE products SET stock_quantity = (stock_quantity + ${itemQty}) WHERE id = ${itemId}`;
                con.query(query, (error, result)=>{
                    if (error) throw error;
                    console.log(" ");
                    console.log("Success! You have just added " + itemQty + " to " + itemNameQuery)
                    console.log("|--------------------------------------------------|");
                    console.log(" ");
                    displayItems();
                })
            })
        })
    })
}

function addNewProduct(){
    console.log("|--------------------------------------------------|");
    console.log("|-------------------Add New Product----------------|");
    console.log("|--------------------------------------------------|");
    console.log(" ");
    inquirer.prompt({
        name: "itemToAdd",
        type: "input",
        message: "What NEW item do you want to add? Type the product name:"
    }).then(answer => {
        let newItem = answer.itemToAdd;
        inquirer.prompt({
            name: "howMany",
            type: "input",
            message: "How many do you want to add?",
        }).then(answer => {
            let itemQty = answer.howMany;
            inquirer.prompt({
                name: "price",
                type: "input",
                message: "How much is ONE unit?",
            }).then(answer => {
                let itemPrice = answer.price;
                inquirer.prompt({
                    name: "department",
                    type: "input",
                    message: "What department does this item belong to?"
                }).then(answer => {
                    let itemDept = answer.department;
                    let query = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE ("${newItem}", "${itemDept}", ${itemPrice}, ${itemQty})`
                    con.query(query, (error, result) => {
                        if (error) throw error;
                        console.log(" ");
                        console.log("Success! You have just added " + newItem + " | " + "$" + itemPrice + " | Quantity: " + itemQty + " | Department: " + itemDept);
                        console.log("|--------------------------------------------------|");
                        console.log(" ");
                        displayItems();
                    })
                })
            })
        })
    })
}

function noBuy(){
    console.log("y u no buy? bad boy...");
    con.end();
}