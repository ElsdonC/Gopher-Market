const express = require("express")
const router = express.Router()
const logoutController = require("../controllers/logout")
const { ensureAuth } = require('../middleware/ensureAuth')

router.post('/', ensureAuth, logoutController.logout)

module.exports = router