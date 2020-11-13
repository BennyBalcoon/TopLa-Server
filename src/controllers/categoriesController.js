const Category = require('../models/category')

exports.getCategories = function(req, res) {
    Category.findAll({})
        .then((categories) => {
            return res.json(categories)
        })
        .catch((err) => {
            return res.status(422).send({err})
        })
}