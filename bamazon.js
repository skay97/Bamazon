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

    var questions = [
        {
            type: 'input',
            name: 'idNum',
            message: "What is the item id of the product you would like to buy?"
        },
        {
            type: "input",
            name: "qty",
            message: "How many units of this product would you like to buy?"
        }
    ]

    inquirer.prompt(questions).then(answers => {
        console.log("Validating order information");
        // var filteredItems = res.filter(result => result.item_id === answers.idNum)
        var userChoiceId = parseInt(answers.idNum)
        // tests to match the user input item id with the res object item id
        var filteredItems = res.filter(function (result) { return result.item_id === parseInt(answers.idNum) })
        console.log(filteredItems)

        var filteredItem = filteredItems[0].stock_quantity;
        var userQty = parseInt(answers.qty)
        // console.log(parseInt(answers.qty))

        if (filteredItem < userQty) {
            console.log("insufficient quantity")
        }
        else {

            filteredItem -= userQty

            // subtract quantity from sql database
            // show price of item * qty selected

            // 'UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?'
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [filteredItem,userChoiceId], function (err, res) {
                if (err) throw err;
                console.log(userQty * filteredItems[0].price )
                // add price comment
                connection.end();
            })
        }

    });

    // if (res.filter(res.the id of the specific item.stock_quantity< answers.qty)) {
    //     console.log("insufficient quantity")
    // }

});

