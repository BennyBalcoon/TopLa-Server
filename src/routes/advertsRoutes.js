const express = require('express')
const router = express.Router()

const AdvertsCtrl = require('../controllers/advertsController')
const AuthCtrl = require('../controllers/authController')

router.get('', AdvertsCtrl.getAdverts)
router.get('/category/:id', AdvertsCtrl.getAdvertsByCategory)
router.get('/:id', AdvertsCtrl.getAdvertById)

router.post('', AuthCtrl.onlyAuthUser, AdvertsCtrl.createAdvert)

router.patch('/:id', AuthCtrl.onlyAuthUser, AdvertsCtrl.updateAdvert)

router.delete('/:id', AuthCtrl.onlyAuthUser, AdvertsCtrl.deleteAdvertByID)

module.exports = router