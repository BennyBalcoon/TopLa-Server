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

exports.createAdvert = (req, res) => {
    const advertData = req.body
    // console.log(req.user[0].dataValues.id);
    const currentUserId = req.user[0].dataValues.id
    if (!currentUserId) {
        return res.status(403).send({err: 'no user data'})
    }
    advertData.user = currentUserId
    console.log(advertData);
    const advert = new Advert(advertData)

    advert.save()
        .then((advert) => {
            res.status(201).json({advert, message: "Nouvelle annonce créée avec succès"})
    }).catch((err) => {
        return res.status(400).json(err)
    })
}

exports.getSecret = (req, res) => {
    return res.json({ secret: 'I am a secret message '})
}