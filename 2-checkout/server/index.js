require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");
const app = express();

// Added body-parser -> then req.body has content
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 *
 */

app.get('/checkout', function (req, res) {
  // FYI page cookie: "s_id=1001e5ea-4d55-41ab-8de2-3e3ca1f7abcd"
  // But below req.session_id is : 1001e5ea-4d55-41ab-8de2-3e3ca1f7abcd
  var cookie = req.session_id;
  var query = `SELECT * FROM responses WHERE sessionID = '${cookie}'`;
  db.query(query, function (err, result) {
    if (err) {
      res.status(500);
    }
    // If cannot find any sessionID in database, that means customer hasn't checked out yet
    // Then send back 'False' to client
    if (!result || result.length === 0) {
      res.status(201).send(false);
    } else {
      res.status(201).send(true);
    }
  })
});

app.post('/checkout', function (req, res) {
  var query = `INSERT INTO responses (name, email, password, address_line_1, address_line_2, city, state, zipcode, phone_number,
    card_number, expiry_date, cvv, billing_zipcode, sessionID) VALUES ('${req.body.name}','${req.body.email}','${req.body.password}','${req.body.addressLine1}',
  '${req.body.addressLine2}','${req.body.city}','${req.body.state}','${req.body.zipCode}','${req.body.phoneNumber}','${req.body.cardNumber}',
  '${req.body.expiryDate}','${req.body.cvv}','${req.body.billingZipCode}', '${req.session_id}')`;
  db.query(query, function (err, result) {
    if (err) {
      res.status(500);
    }
    console.log('result', result);
  })
  res.status(200).send('Processed successfully!');
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
