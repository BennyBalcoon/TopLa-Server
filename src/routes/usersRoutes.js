const express = require('express')
const router = express.Router()

const UsersCtrl = require('../controllers/userController')
const AdvertsCtrl = require('../controllers/advertsController')
const AuthCtrl = require('../controllers/authController')

router.get('/profil', AuthCtrl.onlyAuthUser, UsersCtrl.getCurrentUser)
router.get('/profil/mes-annonces', AuthCtrl.onlyAuthUser, AdvertsCtrl.getAdvertsByUser)

router.patch('/:id', AuthCtrl.onlyAuthUser, UsersCtrl.updateUser)

router.post('/register', UsersCtrl.register)
router.post('/login', UsersCtrl.login)
router.post('/logout', UsersCtrl.logout)

module.exports = router