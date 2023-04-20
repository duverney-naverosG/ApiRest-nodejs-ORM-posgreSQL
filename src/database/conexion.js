const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize('postgresql://localhost:5432/veterinariaDB')

const sequelize = new Sequelize('veterinariaDB', 'postgres', '18cpzitc42', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize