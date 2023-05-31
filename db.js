var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12622523",
  password: "cl9jqXwZfH",
  database: "sql12622523"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {
    con
}