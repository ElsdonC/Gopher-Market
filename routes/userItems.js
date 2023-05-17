const express = require('express')
const router = express.Router()
const userItemsController = require('../controllers/userItems')
const upload = require('../middleware/uploadImage')
const { ensureAuth } = require('../middleware/ensureAuth')

router.get('/', ensureAuth, userItemsController.getItems)

router.get('/edit/:id', ensureAuth, userItemsController.editItem)

router.post('/postEdit/:id', ensureAuth, upload.single("changed_file"), userItemsController.postEdit)

router.delete('/delete/:id', ensureAuth, userItemsController.deleteItem)

module.exports = router