const { Op } = require("sequelize");

const Advert = require("../models/advert");
const Category = require("../models/category");
const User = require("../models/user");

exports.getAdverts = (req, res) => {

  const where = {
    [Op.and]: [],
  };
  const validParams = {
    title: 'iLike',
    kind: 'eq',
    description: 'iLike',
    location: 'iLike',
    condition: 'eq',
  }

  for (paramName in req.query) {
    if (req.query.hasOwnProperty(paramName)) {
      if (
        validParams[paramName] &&
        req.query[paramName]
      ) {
        let searchString;
        if (validParams[paramName] == 'iLike') {
           searchString = `%${req.query[paramName]}%`
        } else {
           searchString = `${req.query[paramName]}`
        }
        where[Op.and].push({
          [`${paramName}`]: {
            [Op[validParams[paramName]]]: searchString,
          },
        });
      }
    }
  }

  if (where[Op.and].length) {
    Advert.findAll({
      where: where,
      order: [["createdAt", "DESC"]],
      limit: 20,
      include: [
        {
          model: Category,
        },
      ],
    })
      .then((adverts) => {
        return res.json(adverts);
      })
      .catch((err) => {
        return res.status(422).send({ err });
      });
  } else {
    return res.json({});
  }
};

exports.getAdvertById = (req, res) => {
  const id = req.params.id;

  Advert.findByPk(id, {
    include: {
      model: User,
      attributes: ["firstName", "createdAt"],
    },
  })
    .then((advert) => {
      return res.json(advert);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

exports.createAdvert = (req, res) => {
  const advertData = req.body;
  const currentUserId = req.user[0].dataValues.id;
  if (!currentUserId) {
    return res.status(403).send({ err: "no user data" });
  }
  advertData.adv_usrid = currentUserId;
  console.log(advertData);
  const advert = new Advert(advertData);

  advert
    .save()
    .then((advert) => {
      res.status(201).json({ advert, message: "Nouvelle annonce créée avec succès" });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

exports.getAdvertsByUser = (req, res) => {
  const currentUserId = req.user[0].dataValues.id;

  Advert.findAll({
    where: { adv_usrid: currentUserId },
    include: [
      {
        model: Category,
        // attributes: ['id', 'name']
      },
    ],
  })
    .then((adverts) => {
      res.status(201).json(adverts);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

exports.getAdvertsByCategory = (req, res) => {
  const categoryId = req.params.id;
  Advert.findAll({
    where: {
      adv_catid: categoryId,
    },
    include: [
      {
        model: Category,
        // attributes: ['id', 'name']
      },
    ],
  })
    .then((adverts) => {
      res.status(201).json(adverts);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

exports.updateAdvert = (req, res) => {
  const advertData = req.body;
  const currentUserId = req.user[0].dataValues.id;
  const id = req.params.id;

  Advert.findByPk(id)
    .then((advert) => {
      if (advert.adv_usrid != currentUserId) {
        return res.status(401).json({ message: "Not Authorized" });
      }

      advert
        .update(advertData)
        .then((advert) => {
          res.status(201).json({ advert, message: "L'annonce a bien été modifiée" });
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    })
    .catch(() => {
      return res.status(500).json({ message: "Il n'y pas d'annonce correspondante" });
    });
};

exports.deleteAdvertByID = (req, res) => {
  const id = req.params.id;
  const currentUserId = req.user[0].dataValues.id;

  Advert.findByPk(id)
    .then((advert) => {
      if (advert.adv_usrid != currentUserId) {
        return res.status(401).json({ message: "Not Authorized" });
      }

      advert
        .destroy()
        .then((advert) => {
          res.status(201).json({ advert, message: "L'annonce a bien été supprimée" });
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    })
    .catch(() => {
      return res.status(500).json({ message: "Il n'y pas d'annonce correspondante" });
    });
};
