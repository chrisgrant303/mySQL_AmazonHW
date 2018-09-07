const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function validateInput(value) {
    if (isNaN(value) === false) {
        return true;
    }
    return false;
};


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function storePrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'What is the Item ID that you are interested in?',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Please specify a quantity',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        var item = input.item_id;
        var quantity = input.quantity;
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id }, function (err, data) {
            var storeInfo = data[0];
            console.log(storeInfo);
            if (quantity <= storeInfo.stock_quantity) {
                console.log('This item is still in stock, we will begin preparing an order shortly!');
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (storeInfo.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                connection.query(updateQueryStr, function (err, data) {
                    if (err) throw err;
                    console.log('Thanks for placing an order.  Your total cost is: $' + storeInfo.price * quantity);
                    console.log('Thanks for sending us all of your password information!');
                    console.log("\n---------------------------------------------------------------------\n");
                    connection.end();
                })
            } else {
                console.log('We are out of stock');
                console.log("\n---------------------------------------------------------------------\n");

                displayInventory();
            }
        });
    });
};

function displayInventory() {
    searchStr = 'SELECT * FROM products';
    connection.query(searchStr, function (err, data) {
        if (err) throw err;
        console.log('WELCOME TO BAMAZON ONLINE');
        console.log('Existing Inventory: ');
        console.log('...................\n');
        var storeList = '';
        for (var i = 0; i < data.length; i++) {
            storeList = '';
            storeList += 'Item ID: ' + data[i].item_id + '  ||  ';
            storeList += 'Product Name: ' + data[i].product_name + '  ||  ';
            storeList += 'Department: ' + data[i].department_name + '  ||  ';
            storeList += 'Price: $' + data[i].price + '\n';
            storeList += 'Amount Left: ' + data[i].stock_quantity + '\n';
            console.log(storeList);
        }
        console.log("---------------------------------------------------------------------\n");
        connection.end();
        storePrompt();
    });
};

displayInventory();
