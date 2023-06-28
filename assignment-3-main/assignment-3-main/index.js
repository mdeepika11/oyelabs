const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

function insertData(data) {
  data.forEach((customer) => {
    connection.query(
      "SELECT * FROM customers WHERE email = ?",
      customer.email,
      (error, results) => {
        if (error) {
          console.error("Error querying the database:", error);
        } else {
          if (results.length > 0) {
            const existingCustomer = results[0];
            const { name, email } = customer;
            const updatedCustomer = { ...existingCustomer, name };
            connection.query(
              "UPDATE customers SET ? WHERE email = ?",
              [updatedCustomer, email],
              (error) => {
                if (error) {
                  console.error("Error updating the customer:", error);
                } else {
                  console.log("Customer updated successfully:", email);
                }
              }
            );
          } else {
            connection.query(
              "INSERT INTO customers SET ?",
              customer,
              (error) => {
                if (error) {
                  console.error("Error inserting the customer:", error);
                } else {
                  console.log(
                    "Customer inserted successfully:",
                    customer.email
                  );
                }
              }
            );
          }
        }
      }
    );
  });
}

const customers = [
  { name: "santosh", email: "santosh11@yopmail.com" },
  { name: "ravi", email: "ravi11@yopmail.com" },
];

insertData(customers);
