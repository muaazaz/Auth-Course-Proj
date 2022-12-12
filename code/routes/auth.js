const express = require('express')
const controllers = require('../controllers/auth') 

const router = express.Router()


router.post('/signup',controllers.signup_post)
router.get('/signup',controllers.signup_get)

router.get('/login',controllers.login_get)
router.post('/login',controllers.login_post)

router.get('/logout',controllers.logout_get)

module.exports = router