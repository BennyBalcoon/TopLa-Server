const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user
                .save()
                .then(() => {
                    res.status(201).send({
                        message: "New user created !",
                    });
                })
                .catch((error) => {
                    res.status(500).send(error);
                });
        })
        .catch((error) => {
            res.status(500).send(error)
        })
};

exports.login = (req, res) => {
    console.log(req.body.email);
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    error: "No user found !"
                });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    console.log(user.password);
                    console.log(req.body.password);
                    if (!valid) {
                        return res.status(401).send({
                            error: "Email or password not correct !"
                        });
                    }
                    res.status(200).send({
                        userId: user._id,
                        token: jwt.sign({
                            userId: user._id
                        }, "A_RANDOM_TOKEN_SECRET", {
                            expiresIn: "24h"
                        }),
                    });
                })
                .catch((error) => {
                    res.status(500).send(error);
                });
        })
        .catch((error) => {
            res.status(500).json({
                error
            });
        });
};