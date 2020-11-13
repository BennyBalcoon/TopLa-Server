const Advert = require('../models/advert')

exports.getAdverts = function(req, res) {
    Advert.findAll({})
        .then((adverts) => {
            return res.json(adverts)
        })
        .catch((err) => {
            return res.status(422).send({err}) 
        })
}

exports.getAdvertById = (req, res) => {
    const id = req.params.id

    Advert.findByPk(id)
        .then((advert) => {
            return res.json(advert)
        })
        .catch((err) => {
            return res.status(500).send(err)
        })
}

exports.getSecret = (req, res) => {
    return res.json({ secret: 'I am a secret message '})
}