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
    console.log("|------------------Supervisor Access---------------|");
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