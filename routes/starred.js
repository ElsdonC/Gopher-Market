const express = require('express')
const router = express.Router()
const starredController = require('../controllers/starred')
const { ensureAuth } = require('../middleware/ensureAuth')

router.get("/", ensureAuth, starredController.getBookmarked)

router.post("/add/:id", ensureAuth, starredController.add)

router.post("/remove/:id", ensureAuth, starredController.remove)

module.exports = router