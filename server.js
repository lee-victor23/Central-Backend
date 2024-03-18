require("dotenv").config();

const cors = require('cors');
const express = require("express");

const pool = require("./database/database");
const logger = require("./logger/logger");

const customerRoutes = require('./routes/customers');
const invociesRoutes = require('./routes/invoices');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 
app.use(customerRoutes);
app.use(invociesRoutes);

// Using in an express application
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
