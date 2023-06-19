const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    getItem: async (req, res) => {
        const id = req.params.id;
        const item = await ItemModel.find({ _id: id });
        var seller = await UserModel.find({ googleId: item[0].createdById });
        res.render("uniqueItem.ejs", {
            item: item[0],
            user: req.user,
            seller: seller[0],
        });
    },
};
