const express = require('express')
const router = express.Router()
usersCtrl = require('../controllers/users')

module.exports = router

router.post('/signup', usersCtrl.signup)
router.post('/login', usersCtrl.login)