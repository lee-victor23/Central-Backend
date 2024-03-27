const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // The instance from step 2

const Customer = sequelize.define(
  "Customer",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    email_address: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true, // Validates the email format
      },
    },
  },
  {
    timestamps: true, // Enable/disable timestamps
  }
);

module.exports = Customer;
