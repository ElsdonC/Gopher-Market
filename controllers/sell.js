const ItemModel = require('../models/items')

module.exports = {
    sellItem: (req,res)=>{
        if (req.user.googleId == "demo") {
            res.json({"message": "Selling an item is restricted for Demo users"})
        }
        console.log("This is from create controller")
        let itemName = req.body.name
        let itemPrice = req.body.price
        let itemDescription = req.body.description
        let itemCategory = req.body.category
        let filePath = req.file.path.slice(7) //slices the "public" out of the filename
        var createdById = req.user.googleId
        let itemLocation = req.body.location
        ItemModel.create({name: itemName, location: itemLocation, category: itemCategory, price: itemPrice, description: itemDescription, imagePath: filePath, createdById: createdById})
        res.redirect('/userItems')
    }
}