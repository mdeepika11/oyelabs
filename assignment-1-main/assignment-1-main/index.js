const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

const app = express();

app.use(bodyParser.json());

app.post("/addCustomer", (req, res) => {
  const { name, phoneNumber } = req.body;

  if (!name || !phoneNumber) {
    return res
      .status(400)
      .json({ error: "Name and phoneNumber are required." });
  }

  pool.query(
    "SELECT * FROM customers WHERE phoneNumber = ?",
    [phoneNumber],
    (error, results) => {
      if (error) {
        console.error("Error checking for duplicate phone numbers:", error);
        return res.status(500).json({ error: "Internal server error." });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Phone number already exists." });
      }

      const customer = { name, phoneNumber };
      pool.query("INSERT INTO customers SET ?", customer, (error) => {
        if (error) {
          console.error("Error adding customer:", error);
          return res.status(500).json({ error: "Internal server error." });
        }

        return res
          .status(200)
          .json({ message: "Customer added successfully." });
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
