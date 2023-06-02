const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    getIndex: async (req, res) => {
        let min;
        let max;
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
        if (req.query.minPrice && req.query.maxPrice) {
            min = req.query.minPrice;
            max = req.query.maxPrice
        }
        let filteredItems = [];
        let items = await ItemModel.find();

        items.forEach((item) => {
            let shouldAddItem = true;

            // Apply filters
            if (category && item.category !== category) {
                if (category != "all") {
                    shouldAddItem = false;
                }
            }
            if (location && item.location !== location) {
                if (location != "all") {
                    shouldAddItem = false;
                }
            }
            if ((min && max) && (item.price < Number(min) || item.price > Number(max))) {
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
        if (filteredItems.length > 0) {
            res.render("filtered.ejs", {
                items: filteredItems,
                user: req.user,
                page: "no items found",
                title: null,
            });
        } else {
            res.render("noItemsFound.ejs", {
                page: "No items found",
                title: "No items found",
                user: req.user
            })
        }
    },
    getFilter: async (req, res) => {
        
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
