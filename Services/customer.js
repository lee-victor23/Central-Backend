const express = require("express");
const router = express.Router();
const Customer = require("../model/customer.model");

//Add
router.post("/customers", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ All
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Find By PK
router.get("/customers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

// Edit
router.put("/customers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    await customer.update(req.body);
    res.send(customer);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//Delete
router.delete("/customers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    await customer.destroy();
    res.send("Customer deleted successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
