const { Sequelize } = require('sequelize');
const dotenv = require ('dotenv')
dotenv.config()
// const config = require('../config/dev')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl : {
          rejectUnauthorized: false
        }
      },
});

// const sequelize = new Sequelize('postgres://postgres:Spielberg1@localhost:5432/postgres');


module.exports = sequelize;