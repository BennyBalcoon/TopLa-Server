const express = require('express')
const router = express.Router()

const UsersCtrl = require('../controllers/userController')
const AuthCtrl = require('../controllers/authController')

router.get('/me', AuthCtrl.onlyAuthUser, UsersCtrl.getCurrentUser)
router.post('/register', UsersCtrl.register)
router.post('/login', UsersCtrl.login)
router.post('/logout', UsersCtrl.logout)

module.exports = router