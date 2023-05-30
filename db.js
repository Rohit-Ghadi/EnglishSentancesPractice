var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "sys"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {
    con
}