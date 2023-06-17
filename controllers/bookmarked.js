const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    add: async (req, res) => {
        let id = req.params.id
        await UserModel.updateOne(
            { googleId: req.user.googleId },
            { $push: { saved: id } }
        ).then(async ()=>{
            let saved = await UserModel.find({
                googleId: req.user.googleId
            }, {saved: 1, _id: 0})
            req.user.saved = saved[0].saved
            res.json({"list": req.user.saved})
        }).catch(err=>{
            console.log(err)
        })
    },
    remove: async (req, res) => {
        let id = req.params.id
        await UserModel.updateOne(
            { googleId: req.user.googleId },
            { $pull: { saved: id } }
        ).then(async ()=>{
            let saved = await UserModel.find({
                googleId: req.user.googleId
            }, {saved: 1,  _id: 0})
            req.user.saved = saved[0].saved
            res.json({"list": req.user.saved})
        }).catch(err=>{
            console.log(err)
        })
    },
};
