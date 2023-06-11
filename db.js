var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "db4free.net",
  user: "marathi",
  password: "Marathi@2023",
  database: "marathisentance"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {
    con
}