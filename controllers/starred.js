const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    getBookmarked: async (req, res) => {
        let starred = req.user.starred;
        const items = await ItemModel.find({ _id: { $in: starred } });
        res.render("starred.ejs", {
            user: req.user,
            items: items,
            page: "bookmarked",
            title: "Bookmarked Items",
        });
    },
    add: async (req, res) => {
        let id = req.params.id
        await UserModel.updateOne(
            { googleId: req.user.googleId },
            { $push: { starred: id } }
        ).then(async ()=>{
            let starred = await UserModel.find({
                googleId: req.user.googleId
            }, {starred: 1, _id: 0})
            req.user.starred = starred[0].starred
            res.json({"list": req.user.starred})
        }).catch(err=>{
            console.log(err)
        })
        
    },
    remove: async (req, res) => {
        let id = req.params.id
        await UserModel.updateOne(
            { googleId: req.user.googleId },
            { $pull: { starred: id } }
        ).then(async ()=>{
            let starred = await UserModel.find({
                googleId: req.user.googleId
            }, {starred: 1,  _id: 0})
            req.user.starred = starred[0].starred
            res.json({"list": req.user.starred})
        }).catch(err=>{
            console.log(err)
        })
    },
};
