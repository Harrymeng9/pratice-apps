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
app.post('/checkout', function (req, res) {
  console.log('body.id', req.body);
  var query = `INSERT INTO responses (name, email, password, address_line_1, address_line_2, city, state, zipcode, phone_number,
    card_number, expiry_date, cvv, billing_zipcode) VALUES ('${req.body.name}','${req.body.email}','${req.body.password}','${req.body.addressLine1}',
  '${req.body.addressLine2}','${req.body.city}','${req.body.state}','${req.body.zipCode}','${req.body.phoneNumber}','${req.body.cardNumber}',
  '${req.body.expiryDate}','${req.body.cvv}','${req.body.billingZipCode}')`;
  db.query(query, function(err, result) {
    if (err) {throw err;}
    console.log('result', result);
  })
  res.status(200).send('Processed successfully!');
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
