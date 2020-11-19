const Sequelize = require('sequelize');
const sequelize = require('../config/db.config')

const User = require('./user')
const Category = require('./category')

const Advert = sequelize.define('adverts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'adv_id'
      },
      kind: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['Don', 'Demande'],
        field: 'adv_kind'  
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'adv_title'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'adv_description'
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'adv_image'
      },
      image2: {
        type: Sequelize.STRING,
        field: 'adv_second_image'
      },
      image3: {
        type: Sequelize.STRING,
        field: 'adv_third_image'
      },
      condition: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['comme neuf', 'bon état', 'état moyen', 'à retaper'],
        field: 'adv_condition' 
      },
      location: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'adv_location'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'adv_createdat'
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'adv_updatedat'
      },
      user: {
         type: Sequelize.INTEGER,
         field: 'adv_usrid',
         references: {
             model: User,
             key: 'usr_id'
         } 
      },
      category: {
        type: Sequelize.INTEGER,
        field: 'adv_catid',
        references: {
            model: Category,
            key: 'cat_id'
        } 
     }

})

module.exports = Advert