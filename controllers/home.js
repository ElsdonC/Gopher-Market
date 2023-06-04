const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    getIndex: async (req, res) => {
        let min;
        let max;
        let category;
        let location;
        let searchQuery;
        let filterTags = [];
        if (req.query.minPrice && req.query.maxPrice) {
            if (req.query.minPrice != 0 || req.query.maxPrice != 1000) {
                let min = req.query.minPrice;
                let max = req.query.maxPrice;
                filterTags.push(`$${min}-$${max}`)
            }
        }
        if (req.query.category) {
            category = req.query.category;
            filterTags.push(`Category: ${category}`)
        }
        if (req.query.location) {
            location = req.query.location;
            filterTags.push(`Location: ${location}`)
        }
        if (req.query.q) {
            searchQuery = req.query.q;
            filterTags.push(`Search: "${searchQuery}"`)
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
                tags: filterTags,
                title: null,
            });
        } else {
            res.render("noItemsFound.ejs", {
                page: "No items found",
                title: "No items found",
                tags: filterTags,
                user: req.user
            })
        }
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
