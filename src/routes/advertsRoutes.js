const express = require('express')
const router = express.Router()

const AdvertsCtrl = require('../controllers/advertsController')
const AuthCtrl = require('../controllers/authController')

router.get('', AdvertsCtrl.getAdverts)
router.get('/secret', AuthCtrl.onlyAuthUser , AdvertsCtrl.getSecret)
router.get('/:id', AdvertsCtrl.getAdvertById)

router.post('', AuthCtrl.onlyAuthUser, AdvertsCtrl.createAdvert)

module.exports = router