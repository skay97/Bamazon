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
    console.log("connected")
});

// function run() {
connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for(var i = 0; i<res.length; i++){
        console.log("-------------------------------------------------------------")
        console.log(`item id: ${res[i].item_id}`);
        console.log(`product name: ${res[i].product_name}`);
        console.log(`department: ${res[i].department_name}`);
        console.log(`price: ${res[i].price}`);
        console.log(`stock quantity: ${res[i].stock_quantity}`);
        console.log("-------------------------------------------------------------")
    }

    var questions = [
        {
          type: 'input',
          name: 'idNum',
          message: "What is the item id of the product you would like to buy?"
        },
        {
            type: "input",
            name:"qty",
            message: "How many units of this product would you like to buy?" 
        }
    ]
    
    inquirer.prompt(questions).then(answers => {
        console.log("Validating order information");
        // filter through res to get the one item with id of '10'
        // then check quanitity on that one returned item 
      });

});

