const Sequelize = require('sequelize');
const sequelize = require('../config/db.config')
const bcrypt = require('bcrypt')

const User = sequelize.define('users', {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    // allowNull: false,
    primaryKey: true,
    field: 'usr_id'
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'usr_firstname'
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'usr_lastname'
  },
  birthdate: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'usr_birthdate'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    field: 'usr_email',
    validate: {
      isEmail: {msg: 'Please provide valid e-mail address'},
      isLowercase: true
      // is: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'usr_password',
    validate: {
      notEmpty: {msg: 'Password can\'t be empty '},
      min: 8,
      max: 16
    }
    // set(value) {
    //   this.setDataValue('password', bcrypt.hashSync(value, 10))
    // }
  },
  createdAt: {
    type: Sequelize.DATE,
    // allowNull: false,
    field: 'usr_createdat'
  },
  updatedAt: {
    type: Sequelize.DATE,
    // allowNull: false,
    field: 'usr_updatedat'
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(user.password, salt) 
    }
  }
});

module.exports = User
