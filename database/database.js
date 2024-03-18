const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize  = new Sequelize( process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
  // additional options
});

async function testConnection() {
  try {
    await sequelize.authenticate(); 
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

//testConnection();

module.exports = sequelize;

