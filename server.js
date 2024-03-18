require("dotenv").config();

const cors = require('cors');
const express = require("express");

const logger = require("./logger/logger");

const gridDataRoutes = require('./services/gridData');
const customerRoutes = require('./services/customer');
const invociesRoutes = require('./routes/invoices');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 
app.use(gridDataRoutes);
app.use(customerRoutes);

// Using in an express application
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
