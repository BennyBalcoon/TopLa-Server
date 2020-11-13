const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require ('dotenv')
dotenv.config()
// const config = require('../config/dev')

exports.register = function(req, res) {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const birthdate = req.body.birthdate;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  if (password !== passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: "is not the same as password confirmation",
      },
    });
  }

  User.create({
    firstName: firstName,
    lastName: lastName,
    birthdate: birthdate,
    email: email,
    password: password,
  })
    .then((user) => {
      res.json({ user, message: "account created successfully !" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  User.findAll({ where: { email } }).then((user) => {
    if (!user) {
      res.status(401).json({ message: "No user found !" });
    }

   const originalPassword = user[0].dataValues.password
   console.log(user[0].dataValues);

   bcrypt
    .compare(password, originalPassword)
    .then((isMatch) => {
      if (isMatch) {
        console.log('matched');
        const { id, firstName, lastName, birthdate, email, createdAt } = user[0].dataValues
        const payload = { id, email }

        jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1h'
        }, (err, token) => {
          res.json({
            id: id,
            firstName: firstName,
            lastName: lastName,
            birthdate: birthdate,
            email: email,
            createdAt: createdAt,
            token: token
          })
        })
      } else {
        return res.status(400).json({message: 'Something went wrong'})
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  });
};

exports.logout = function (req, res) {
  req.logout()
  return res.json({ status: 'Session destroyed'})
}

exports.getUserById = (req, res) => {
  const id = req.params.id

  User.findByPk(id)
      .then((user) => {
          return res.json(user)
      })
      .catch((err) => {
          return res.status(500).send(err)
      })
}

exports.getCurrentUser = (req, res) => {
  const user = req.user

  if(!user) {
    return res.sendStatus(422)
  }

  return res.json(user)
}
