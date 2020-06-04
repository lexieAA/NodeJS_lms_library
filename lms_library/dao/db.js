var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '3360',
    user     : 'root',
    password : 'root',
    database : 'library'
});

module.exports = connection;
