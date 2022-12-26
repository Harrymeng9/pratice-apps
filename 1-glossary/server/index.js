require("dotenv").config();

const express = require("express");
const path = require("path");
const db = require('./db');

const app = express();
const port = 4000;

app.use(express.json());
//Serving static files in Express
app.use(express.static(path.join(__dirname, '../client/dist/')));


app.post("/glossary", function (req, res) {

  db.checkExist(req.body.term)
    .then((result) => {
      if (result > 0) {
        res.send('false');
      } else {
        // Save data into database
        db.save(req.body)
          .then((result) => {
            res.status(201).send('Save successfully!')
          })
          .catch((err) => {
            res.status(500).send('Save failed!')
          })
      };
    });
});

app.post("/glossaryUpdate", function (req, res) {
  db.updateRecord(req.body.term, req.body.definition)
    .then((data) => {
      res.status(200).send('Update successfully!')
    })
    .catch((err) => {
      res.status(500).send('Update failed!')
    })
});


app.post("/glossaryDelete", function (req, res) {
  db.deleteRecord(req.body.term)
    .then((data) => {
      res.status(200).send('Delete successfully!')
    })
    .catch((err) => {
      res.status(500).send('Delete failed!')
    })
});


app.get("/glossary", function (req, res) {
  // Get data from database
  db.get()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});