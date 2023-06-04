const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const { con } = require("./db");
var cookieParser = require("cookie-parser");
var session = require("express-session");

app.use(cookieParser());
app.use(session({ secret: "oursecret" }));

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use("/statics", express.static(path.join(__dirname, "UI")));

app.get("/", (req, res) => {
  if (req.session.login) {
    res.sendFile(__dirname + "/Htmls/main.html");
  } else {
    res.sendFile(__dirname + "/Htmls/index.html");
  }
});

app.get("/login", (req, res) => {
  if (!req.query.username || req.query.username.length == 0)
    return res.send("User not found");
  if (!/^[a-zA-Z]*$/.test(req.query.username))
    return res.send("User id invalid");

  con.query(
    `SELECT * FROM users where username = '${req.query.username.toLowerCase()}'`,
    function (err, results, fields) {
      if (results.length > 0) {
        req.session.login = req.query.username.toLowerCase();

        res.send("Login Successfull");
      } else {
        res.send("user not found");
      }
    }
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy();

  res.send("Logout Successfull");
});

app.get("/sentence", (req, res) => {
  if (req.session.login) {
    con.query(
      "SELECT * FROM marathisentences ORDER BY RAND() LIMIT 1",
      function (err, results, fields) {
        //   console.log(results); // results contains rows returned by server
        //   console.log(fields); // fields contains extra meta data about results, if available
        res.send(results[0]);
      }
    );
  } else {
    res.sendFile(__dirname + "/Htmls/index.html");
  }
});

app.post("/sentence", urlencodedParser, (req, res) => {
  // console.log(req.body);
  if (req.session.login) {
    let marathi_sentence = req.body.marathi_text;
    let eng_sentence = req.body.eng_text;
    con.query(
      `INSERT INTO marathisentences (marathi_sentence,english_sentence,username) values ('${marathi_sentence}','${eng_sentence}','${req.session.login}')`,
      function (err, results, fields) {
        console.log(err);
        //   console.log(results); // results contains rows returned by server
        //   console.log(fields); // fields contains extra meta data about results, if available
        // console.log("Result");
        // console.log(results.affectedRows);
        if (results.affectedRows == 1) {
          res.send("Sentance added in database");
        } else {
          res.send("error");
        }
      }
    );
  } else {
    res.sendFile(__dirname + "/Htmls/index.html");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
