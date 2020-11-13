const Sequelize = require('sequelize');
const sequelize = require('../config/db.config')

const Category = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'cat_id'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'cat_name'
      },
      image: {
        type: Sequelize.STRING,
        field: 'cat_image'
      },
      createdAt: {
        type: Sequelize.DATE,
        // allowNull: false,
        field: 'cat_createdat'
      },
      updatedAt: {
        type: Sequelize.DATE,
        // allowNull: false,
        field: 'cat_updatedat'
      }
})

module.exports = Category