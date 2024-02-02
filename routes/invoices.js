const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require("../Services/invoices"); // Update the path accordingly

// READ all invoices
router.get("/invoices", async (req, res) => {
  try {
    const allCustomers = await getAllInvoices();
    res.json(allCustomers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ a single invoice by ID
router.get("/invoices/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await getInvoiceById(id);
    if (!invoice) {
      return res.status(404).send("Invoice not found");
    }
    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// CREATE a new invoice
router.post("/invoices", async (req, res) => {
  try {
    const invoice = await createInvoice(req.body);
    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// UPDATE a invoice
router.put("/invoices/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedInvoice = await updateInvoice(id, req.body);
    if (!updatedInvoice) {
      return res.status(404).send("Invoice not found");
    }
    res.json(updatedCustomer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE a invoice
router.delete("/invoices/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await deleteInvoice(id);
    if (!deletedCustomer) {
      return res.status(404).send("Invoice not found");
    }
    res.json({ message: "Invoice successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
