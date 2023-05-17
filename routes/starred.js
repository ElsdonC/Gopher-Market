const express = require('express')
const router = express.Router()
const starredController = require('../controllers/starred')
const { ensureAuth } = require('../middleware/ensureAuth')

router.get("/", ensureAuth, starredController.getStarred)

router.get("/add/:id", ensureAuth, starredController.addStar)

router.get("/remove/:id", ensureAuth, starredController.removeStar)

module.exports = router