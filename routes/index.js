const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const mainController = require('../controllers/main')

router.get('/', mainController.get)

router.get('/item/:name', homeController.getItem)

module.exports = router