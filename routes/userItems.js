const express = require('express')
const router = express.Router()
const userItemsController = require('../controllers/userItems')
const mainController = require('../controllers/main')
const upload = require('../middleware/uploadImage')
const { ensureAuth } = require('../middleware/ensureAuth')

router.get('/', ensureAuth, mainController.get)

router.post('/edit/:id', ensureAuth, upload.single("changed_file"), userItemsController.edit)

router.delete('/delete/:id', ensureAuth, userItemsController.deleteItem)

module.exports = router