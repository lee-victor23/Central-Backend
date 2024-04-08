const pool = require('../database/database'); // Update the path according to your structure

const createInvoice = async (Invoice) => {
    const { invoice_number, customer_id, amount, invoice_date } = Invoice;
    const now = new Date();
    const newInvoice = await pool.query(
        'INSERT INTO invoices (invoice_number, customer_id, amount, invoice_date, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [invoice_number, customer_id, amount, invoice_date, now]
    );
    return newInvoice.rows[0];
};

const getInvoices = async () => {
    const allInvoices = await pool.query('SELECT * FROM invoices');
    return allInvoices.rows;
};

const getInvoiceById = async (id) => {
    const Invoice = await pool.query('SELECT * FROM invoices WHERE id = $1', [id]);
    return Invoice.rows[0];
};

const updateInvoice = async (id, Invoice) => {
    const { invoice_number, customer_id, amount, invoice_date } = Invoice;
    const updatedInvoice = await pool.query(
        'UPDATE invoices SET invoice_number = $1, customer_id = $2, amount = $3, invoice_date = $4 WHERE id = $5 RETURNING *',
        [invoice_number, customer_id, amount, invoice_date, id]
    );
    return updatedInvoice.rows[0];
};

const deleteInvoice = async (id) => {
    const deletedInvoice = await pool.query('DELETE FROM invoices WHERE id = $1 RETURNING *', [id]);
    return deletedInvoice.rows[0];
};

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};
