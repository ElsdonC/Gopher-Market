const express = require('express')
const router = express.Router()
const bookmarkedController = require('../controllers/bookmarked')
const mainController = require('../controllers/main')
const { ensureAuth } = require('../middleware/ensureAuth')

router.get("/", ensureAuth, mainController.get)

router.post("/add/:id", ensureAuth, bookmarkedController.add)

router.post("/remove/:id", ensureAuth, bookmarkedController.remove)

module.exports = router