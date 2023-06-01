const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    getIndex: async (req, res) => {
        const items = await ItemModel.find();
        res.render("index.ejs", {
            items: items,
            user: req.user,
            page: "home",
            title: null,
        });
    },
    filter: async (req, res) => {
        let minPrice = req.query.minPrice;
        let maxPrice = req.query.maxPrice;
        let category;
        let location;
        let searchQuery;
        if (req.query.category) {
            category = req.query.category;
        }
        if (req.query.location) {
            location = req.query.location;
        }
        if (req.query.q) {
            searchQuery = req.query.q;
        }

        let filteredItems = [];
        let items = await ItemModel.find();

        items.forEach((item) => {
            let shouldAddItem = true;

            // Apply filters
            if (category && item.category !== category) {
                shouldAddItem = false;
            }
            if (location && item.location !== location) {
                shouldAddItem = false;
            }
            if (item.price < minPrice || item.price > maxPrice) {
                shouldAddItem = false;
            }
            if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                shouldAddItem = false;
            }
            // Add the item to the filtered list if it meets all the filter conditions
            if (shouldAddItem) {
                filteredItems.push(item);
            }
           
        });
        console.log(filteredItems)
        res.render("index.ejs", {
            items: filteredItems,
            user: req.user,
            page: "filter",
            title: "filter"
        })
    },
    getItem: async (req, res) => {
        const name = req.params.name;
        const item = await ItemModel.find({ name: name });
        var seller = await UserModel.find({ googleId: item[0].createdById });
        res.render("uniqueItem", {
            item: item[0],
            user: req.user,
            page: "item",
            title: item[0].name,
            seller: seller[0],
        });
    },
};
