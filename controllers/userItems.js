const ItemModel = require("../models/items");
const fs = require("fs");

module.exports = {
    getItems: async (req, res) => {
        var items = await ItemModel.find({
            createdById: req.user.googleId,
        });
        
        res.render("userItems.ejs", {
            items: items,
            user: req.user,
            tags: false,
            page: "userItems",
            title: "My Items",
        });
    },
    editItem: async (req, res) => {
        const item = await ItemModel.findOne({ _id: req.params.id });
        res.render("edit.ejs", {
            item: item,
            user: req.user,
            title: "Edit Item",
        });
    },
    postEdit: async (req, res) => {
        let itemName = req.body.name;
        let itemPrice = req.body.price;
        let itemDescription = req.body.description;
        if (req.body.location != "") {
            var itemLocation = req.body.location;
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
                    location: itemLocation,
                }
            );
        } else if (req.body.location) {
            await ItemModel.updateOne(
                { _id: req.params.id },
                {
                    name: itemName,
                    price: itemPrice,
                    description: itemDescription,
                    location: itemLocation,
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
        if (req.user.googleId == "demo") {
            res.json({ message: "Delete Action restricted for Demo" });
        } else {
            const item = await ItemModel.findOne({ _id: req.params.id });
            await ItemModel.deleteOne({ imagePath: item.imagePath });
            await fs.promises.unlink(`public/${item.imagePath}`);
            res.redirect("/userItems");
        }
    },
};
