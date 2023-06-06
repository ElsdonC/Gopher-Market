const ItemModel = require("../models/items");
const fs = require("fs");

module.exports = {
    edit: async (req, res) => {
        console.log("edit")
        let update = {
            "name": req.body.name,
            "price": req.body.price,
            "description": req.body.description
        }
        if (req.body.location != "") {
            update["location"] = req.body.location;
        }
        if (req.file) {
            req.file.path.slice(7);
            const item = await ItemModel.findOne(
                { _id: req.params.id },
                "imagePath"
            );
            removeImageFile(item);
        }
        await ItemModel.updateOne(
            { _id: req.params.id },
            update
        );
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
