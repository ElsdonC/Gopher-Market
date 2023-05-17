const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
  getStarred: async (req, res) => {
    let starred = req.user.starred;
    const items = await ItemModel.find({ _id: { $in: starred } });
    res.render("starred.ejs", { user: req.user, items: items, title: "Starred Items" });
  },
  addStar: async (req, res) => {
    let id = req.params.id;
    await ItemModel.updateOne({ _id: id }, { $inc: { starCount: 1 } });
    await UserModel.updateOne(
      { googleId: req.user.googleId },
      { $push: { starred: id } }
    );
    res.redirect("/");
  },
  removeStar: async (req, res) => {
    let id = req.params.id;
    let googleId = req.user.googleId;
    await ItemModel.updateOne({ _id: id }, { $inc: { starCount: -1 } });
    await UserModel.updateOne({ googleId: googleId }, { $pull: { starred: id } });
    res.redirect("/");
  },
};
