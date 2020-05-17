var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '3360',
    user     : 'root',
    password : 'arh26331',
    database : 'library'
});

module.exports = connection;