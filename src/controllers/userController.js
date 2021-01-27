const User = require("../models/user");
// const Advert = require('../models/advert')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require ('dotenv')
dotenv.config()
// const config = require('../config/dev')

exports.register = function(req, res) {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const avatar = req.body.avatar;
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
    avatar: avatar,
    birthdate: birthdate,
    email: email,
    password: password,
  })
    .then((user) => {
      res.json({ user, message: "account created successfully !" });
    })
    .catch((err) => {
      res.status(500).json({
        errors: { err, message: 'Un problème est apparu: cet email est sans doute déjà utilisé'
        }
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

   bcrypt
    .compare(password, originalPassword)
    .then((isMatch) => {
      if (isMatch) {
        const { id, firstName, lastName, avatar, birthdate, email, createdAt } = user[0].dataValues
        const payload = { id, email }

        jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1h'
        }, (err, token) => {
          res.json({
            id: id,
            firstName: firstName,
            lastName: lastName,
            avatar: avatar,
            birthdate: birthdate,
            email: email,
            createdAt: createdAt,
            token: token
          })
        })
      } else {
        return res.status(400).json({errors: {'message': 'Les données renseignées ne sont pas valides'}})
      }
    })
    .catch((err) => {
      res.status(422).json({errors: {
        'message': 'Something went wrong'
      }})
    })
  })
    .catch(() => {
    res.status(500).send({errors: {
      'message': 'Les données renseignées ne sont pas valides'
    }})
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

exports.updateUser = (req, res) => {
  const userData = req.body;
  const currentUserId = req.user[0].dataValues.id
  const userId = req.params.id;

  User.findByPk(userId)
    .then((user) => {
      if (user.id === currentUserId) {
        user.update(userData, {
          where: {
            id: userId
          },
          returning: true,
          plain: true
        })
        .then((user) => {
          res.json(user);
        })
      } else {
        res.status(422).json({errors: 'Authorization error!'})
      }
    })
    .catch((err) => {
      res.status(422).json(err)
    })
}

