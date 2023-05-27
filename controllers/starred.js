const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    getBookmarked: async (req, res) => {
        let starred = req.user.starred;
        const items = await ItemModel.find({ _id: { $in: starred } });
        res.render("starred.ejs", {
            user: req.user,
            items: items,
            title: "Bookmarked Items",
        });
    },
    add: async (req, res) => {
        let id = req.params.id
        await UserModel.updateOne(
            { googleId: req.user.googleId },
            { $push: { starred: id } }
        ).then(()=>{
            res.json({"message": "added to bookmarks"})
        }).catch(err=>{
            console.log(err)
        })
        
    },
    remove: async (req, res) => {
        let id = req.params.id
        await UserModel.updateOne(
            { googleId: req.user.googleId },
            { $pull: { starred: id } }
        ).then(()=>{
            res.json({"message": "removed from bookmarks"})
        }).catch(err=>{
            console.log(err)
        })
    },
};
