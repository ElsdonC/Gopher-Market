const express = require('express')
const router = express.Router()
const sellController = require('../controllers/sell')
const upload = require('../middleware/uploadImage')
const { ensureAuth, ensureNotDemo } = require('../middleware/ensureAuth')

//Post
router.post('/post', ensureAuth, ensureNotDemo, upload.single('uploaded_file'), sellController.sellItem)

module.exports = router