const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    getItem: async (req, res) => {
        const name = req.params.name;
        const item = await ItemModel.find({ name: name });
        var seller = await UserModel.find({ googleId: item[0].createdById });
        res.render("uniqueItem.ejs", {
            item: item[0],
            user: req.user,
            seller: seller[0],
        });
    },
};
