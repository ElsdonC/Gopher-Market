const ItemModel = require("../models/items");

module.exports = {
    get: async (req, res) => {
        // Instantiate filter variables
        let min;
        let max;
        let category;
        let location;
        let searchQuery;
        let filterTags = [];
        if (req.query.minPrice && req.query.maxPrice) {
            min = Number(req.query.minPrice)
            max = Number(req.query.maxPrice)
            filterTags.push(`$${min}-$${max}`)
        }
        if (req.query.category) {
            category = req.query.category;
            filterTags.push(`category: ${category}`)
        }
        if (req.query.location) {
            location = req.query.location;
            filterTags.push(`location: ${location}`)
        }
        if (req.query.q) {
            searchQuery = req.query.q;
            filterTags.push(`search: "${searchQuery}"`)
        }
        let filteredItems = [];

        // Retrieve Page Specific Items from DB
        let url = req._parsedOriginalUrl.href
        let items;
        let title;
        if (url.split("?")[0] == "/") {
            items = await ItemModel.find();
            title = "Browse Items"
        } else if (url.split("?")[0].includes("/bookmarked")) {
            items = await ItemModel.find({ _id: { $in: req.user.starred } });
            title = "Saved Items"
        } else if (url.split("?")[0].includes("/userItems")) {
            items = await ItemModel.find({ createdById: req.user.googleId })
            title = "My Items"
        }
    
        // Loop through items and filter
        items.forEach((item) => {
            let shouldAddItem = true;
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
            if (min && item.price < min) {
                shouldAddItem = false;
            }
            if (max && item.price > max) {
                shouldAddItem = false;
            }
            if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                shouldAddItem = false;
            }
            if (shouldAddItem) {
                filteredItems.push(item);
            }
        });

        if (filteredItems.length > 0) {
            res.render("index.ejs", {
                items: filteredItems,
                user: req.user,
                tags: filterTags,
                title: title,
            });
        } else {
            res.render("noItemsFound.ejs", {
                title: title,
                tags: filterTags,
                user: req.user
            })
        }
        
    }
}
