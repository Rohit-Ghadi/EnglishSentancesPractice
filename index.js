const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path')
const {con} = require('./db');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/', express.static(path.join(__dirname, 'UI')))

app.get('/sentence', (req, res) => {
    con.query(
        'SELECT * FROM marathisentences ORDER BY RAND() LIMIT 1',
        function(err, results, fields) {
        //   console.log(results); // results contains rows returned by server
        //   console.log(fields); // fields contains extra meta data about results, if available
          res.send(results[0]);
        }
      );
});

app.post('/sentence',urlencodedParser, (req, res) => {
    console.log(req.body);
    let marathi_sentence = req.body.marathi_text;
    let eng_sentence = req.body.eng_text;
    con.query(
        `INSERT INTO marathisentences (marathi_sentence,english_sentence) values ('${marathi_sentence}','${eng_sentence}')`,
        function(err, results, fields) {
            console.log(err);
        //   console.log(results); // results contains rows returned by server
        //   console.log(fields); // fields contains extra meta data about results, if available
          res.send(results);
        }
      );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})