const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up connection to MySQL database
const sequelize = new Sequelize(process.env.MYSQL_URI, {
  dialect: 'mysql',
  logging: false, // Disable logging for production
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
