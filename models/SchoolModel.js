const dotenv = require("dotenv");
const { Sequelize, DataTypes } = require("sequelize");

// Establish the connection to the database
const sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL); // Update with your DB credentials

// Define the School model
const School = sequelize.define("School", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-increments the ID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // 'name' cannot be null
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false, // 'address' cannot be null
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false, // 'latitude' cannot be null
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false, // 'longitude' cannot be null
  },
});

// Sync the model with the database (for development purposes)
sequelize
  .sync({ force: false }) // Set force to true if you want to drop and recreate the table every time (for testing)
  .then(() => {
    console.log("Schools table created successfully!");
  })
  .catch((err) => {
    console.error("Unable to create table:", err);
  });

module.exports = School;
