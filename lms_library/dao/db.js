let mysql = require('mysql');

let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'arh26331',
    database : 'library'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports = connection;