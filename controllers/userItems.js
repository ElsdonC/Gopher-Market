const ItemModel = require("../models/items");
const fs = require("fs");

module.exports = {
    getItems: async (req, res) => {
        const items = await ItemModel.find({ createdById: req.user.googleId });
        res.render("userItems.ejs", { items: items, user: req.user, title: "My Items" });
    },
    editItem: async (req, res) => {
        const item = await ItemModel.findOne({ _id: req.params.id });
        res.render("edit.ejs", { item: item, user: req.user, title: "Edit Item" });
    },
    postEdit: async (req, res) => {
        let itemName = req.body.name;
        let itemPrice = req.body.price;
        let itemDescription = req.body.description;
        if (req.body.location != "") {
            var itemLocation = req.body.location
        }
        if (req.file && req.body.location) {
            let filePath = req.file.path.slice(7);
            const item = await ItemModel.findOne(
                { _id: req.params.id },
                "imagePath"
            );
            removeImageFile(item);
            await ItemModel.updateOne(
                { _id: req.params.id },
                {
                    name: itemName,
                    price: itemPrice,
                    description: itemDescription,
                    imagePath: filePath,
                    location: req.body.location
                }
            );
        } else if (req.body.location) {
            await ItemModel.updateOne(
                { _id: req.params.id },
                {
                    name: itemName,
                    price: itemPrice,
                    description: itemDescription,
                    location: req.body.location
                }
            );
        } else {
            await ItemModel.updateOne(
                { _id: req.params.id },
                {
                    name: itemName,
                    price: itemPrice,
                    description: itemDescription,
                }
            );
        }
        res.redirect("/userItems");
    },
    deleteItem: async (req, res) => {
        console.log(req.params.id)
        const item = await ItemModel.findOne({ _id: req.params.id });
        console.log(item.imagePath);
        await ItemModel.deleteOne({ imagePath: item.imagePath });
        await fs.promises.unlink(`public/${item.imagePath}`);
        console.log("Image Removed");
        res.redirect('/userItems')
    },
};
