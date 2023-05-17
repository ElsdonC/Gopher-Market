const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const upload = require('../middleware/uploadImage')

router.get('/', homeController.getIndex)

router.get('/textbooks', homeController.getTextbooks)

router.get('/school-supplies', homeController.getSchoolSupplies)

router.get('/electronics', homeController.getElectronics)

router.get('/furniture-appliances', homeController.getFurnitureAppliances)

router.get('/clothing', homeController.getClothing)

router.get('/kitchenware', homeController.getKitchenware)

router.post('/filterPrice', homeController.filterPrice)

router.get('/items', homeController.getAllItems)

router.get('/item/:name', homeController.getItem)

module.exports = router