'user strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: null,
    database: 'ilia'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;