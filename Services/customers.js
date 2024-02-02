const pool = require('../database'); // Update the path according to your structure

const createCustomer = async (customer) => {
    const { name, address, phone_number, email_address } = customer;
    const newCustomer = await pool.query(
        'INSERT INTO customers (name, address, phone_number, email_address) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, address, phone_number, email_address]
    );
    return newCustomer.rows[0];
};

const getAllCustomers = async () => {
    const allCustomers = await pool.query('SELECT * FROM customers');
    return allCustomers.rows;
};

const getCustomerById = async (id) => {
    const customer = await pool.query('SELECT * FROM customers WHERE customer_id = $1', [id]);
    return customer.rows[0];
};

const updateCustomer = async (id, customer) => {
    const { name, address, phone_number, email_address } = customer;
    const updatedCustomer = await pool.query(
        'UPDATE customers SET name = $1, address = $2, phone_number = $3, email_address = $4 WHERE customer_id = $5 RETURNING *',
        [name, address, phone_number, email_address, id]
    );
    return updatedCustomer.rows[0];
};

const deleteCustomer = async (id) => {
    const deletedCustomer = await pool.query('DELETE FROM customers WHERE customer_id = $1 RETURNING *', [id]);
    return deletedCustomer.rows[0];
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
