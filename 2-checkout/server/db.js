const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() => {
    // Expand this table definition as needed:
    // Need drop table thru mysql at first if table already exists
    var queryCreateTable = `CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50)
      NOT NULL,email VARCHAR(50), password VARCHAR(50), address_line_1 VARCHAR(100), address_line_2 VARCHAR(100),
       city VARCHAR(50), state VARCHAR(50), zipcode VARCHAR(50), phone_number VARCHAR(50), card_number VARCHAR(100),expiry_date VARCHAR(50),
       cvv VARCHAR(50), billing_zipcode VARCHAR(50), sessionID VARCHAR(100))`;
    db.queryAsync(queryCreateTable)
  }
  )
  .catch((err) => console.log(err));

module.exports = db;
