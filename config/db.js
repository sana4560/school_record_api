const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  uri: process.env.MYSQL_PUBLIC_URL, // Use the full URL from .env file
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
console.log("MYSQL_URL:", process.env.MYSQL_PUBLIC_URL);

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database successfully!");
  connection.release(); // Release the connection after the test
});

// Export the pool to be used in the rest of the application
module.exports = pool;
