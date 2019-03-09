require("dotenv").config();
var inquirer = require("inquirer");
var password = process.env.MYSQL_PASSWORD
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'Bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon")
});

// function run() {
function manager() {
    var questions = [
        {
            type: 'rawlist',
            name: 'options',
            message: "What would you like to do?",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
        }
    ]

    inquirer.prompt(questions).then(function (userChoice) {

        if (userChoice.options === questions[0].choices[0]) {
            viewProducts();
        }
        if (userChoice.options === questions[0].choices[1]){

        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("-------------------------------------------------------------")
            console.log(`item id: ${res[i].item_id}`);
            console.log(`product name: ${res[i].product_name}`);
            console.log(`department: ${res[i].department_name}`);
            console.log(`price: ${res[i].price}`);
            console.log(`stock quantity: ${res[i].stock_quantity}`);
            console.log("-------------------------------------------------------------")
        }
        manager();
    });
}




manager();

