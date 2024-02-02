const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../Services/customers");

// READ all customers
router.get("/customers", async (req, res) => {
  try {
    const allCustomers = await getAllCustomers();
    res.json(allCustomers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ a single customer by ID
router.get("/customers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await getCustomerById(id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// CREATE a new customer
router.post("/customers", async (req, res) => {
  try {
    const customer = await createCustomer(req.body);
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// UPDATE a customer
router.put("/customers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCustomer = await updateCustomer(id, req.body);
    if (!updatedCustomer) {
      return res.status(404).send("Customer not found");
    }
    res.json(updatedCustomer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE a customer
router.delete("/customers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await deleteCustomer(id);
    if (!deletedCustomer) {
      return res.status(404).send("Customer not found");
    }
    res.json({ message: "Customer successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
