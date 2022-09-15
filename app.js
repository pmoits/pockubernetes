const express = require("express");
const app = express();
const fs = require("fs");
const csvtojson = require('csvtojson');
const bodyParser = require('body-parser');
const jsontocsv = require('json2csv');
const port = 8080;

app.get("/data", (req, res) => {
  const file = __dirname + '/data.csv';
  csvtojson().fromFile(file)
    .then(skills => {
      res.send(skills);
    }).catch(err => {
      if (error) {
        res.send(JSON.parse(error));
      }
    });
});

app.use(bodyParser.json());
app.post("/data", (req, res) => {
  const file = __dirname + '/data.csv';
  const csvreq = jsontocsv.parse(req.body);
  const csvArray = csvreq.split('\n');
  //const csvline = csvArray[1];
  const csvline = '\n' + csvArray[1];
  fs.appendFile(file, csvline, (err) => {
    if (err) console.error('Não foi possivel incluir a linha');
    res.send('{ "message":"Linha incluida ao CSV" }')
  });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
