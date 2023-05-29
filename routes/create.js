const express = require('express')
const router = express.Router()
const createController = require('../controllers/create')
const upload = require('../middleware/uploadImage')
const { ensureAuth, ensureNotDemo } = require('../middleware/ensureAuth')

//Post
router.post('/post', ensureAuth, ensureNotDemo, upload.single('uploaded_file'), createController.createItem)

module.exports = router