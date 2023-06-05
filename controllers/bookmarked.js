const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
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
