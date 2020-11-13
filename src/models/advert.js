const Sequelize = require('sequelize');
const sequelize = require('../config/db.config')

const Advert = sequelize.define('adverts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'adv_id'
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
      image1: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'avd_first_image'
      },
      image2: {
        type: Sequelize.STRING,
        field: 'adv_second_image'
      },
      image3: {
        type: Sequelize.STRING,
        field: 'adv_third_image'
      },
      location: {
          type: Sequelize.INTEGER,
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
      }
      
    //   usrid: {
    //      type: Sequelize.INTEGER,
    //      field: 'adv_usrid',
    //      references: {
    //          model: User,
    //          key: 'usr_id'
    //      } 
    //   },
    //   catid: {
    //     type: Sequelize.INTEGER,
    //     field: 'adv_catid',
    //     references: {
    //         model: Category,
    //         key: 'cat_id'
    //     } 
    //  }

})

module.exports = Advert