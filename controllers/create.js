const ItemModel = require('../models/items')

module.exports = {
    getCreate: (req,res)=>{
        res.render('create.ejs', {user:req.user, title: "Sell Item"})
    },
    createItem: (req,res)=>{
        let itemName = req.body.name
        let itemPrice = req.body.price
        let itemDescription = req.body.description
        let itemCategory = req.body.category
        let filePath = req.file.path.slice(7) //slices the "public" out of the filename
        let createdById = req.user.googleId
        ItemModel.create({name: itemName, category: itemCategory, price: itemPrice, description: itemDescription, imagePath: filePath, createdById: createdById})
        res.redirect('/userItems')
    }
}