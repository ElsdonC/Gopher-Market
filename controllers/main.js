const ItemModel = require("../models/items");

module.exports = {
    get: async (req, res) => {
        // Instantiate filter variables
        let min;
        let max;
        let category;
        let location;
        let searchQuery;
        let condition;
        let deliveryMethod;
        let filterTags = [];
        // Filter Price
        if (req.query.minPrice && req.query.maxPrice) {
            min = Number(req.query.minPrice)
            max = Number(req.query.maxPrice)
            filterTags.push(`$${min}-$${max}`)
        }
        // Filter Category
        if (req.query.category) {
            category = req.query.category;
            filterTags.push(`category: ${category}`)
        }
        // Filter Location
        if (req.query.location) {
            location = req.query.location;
            filterTags.push(`location: ${location}`)
        }
        // Filter Search Query
        if (req.query.q) {
            searchQuery = req.query.q;
            filterTags.push(`search: "${searchQuery}"`)
        }
        // Filter Condition
        if (req.query.condition) {
            const conditionValues = req.query.condition.split(",");
            condition = conditionValues;
            filterTags.push(`condition: ${condition.join(", ")}`);
        }
        // Filter Delivery Method
        if (req.query.deliveryMethod) {
            const deliveryMethodValues = req.query.deliveryMethod.split(",");
            deliveryMethod = deliveryMethodValues;
            filterTags.push(`delivery method: ${deliveryMethod.join(", ")}`);
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
            items = await ItemModel.find({ _id: { $in: req.user.saved } });
            title = "Saved Items"
        } else if (url.split("?")[0].includes("/userItems")) {
            items = await ItemModel.find({ createdById: req.user.googleId })
            title = "My Items"
        }
    
        // Loop through items and filter
        items.forEach((item) => {
            let shouldAddItem = true;
            // Category
            if (category && item.category !== category) {
                if (category != "all") {
                    shouldAddItem = false;
                }
            }
            // Location
            if (location && item.location !== location) {
                if (location != "all") {
                    shouldAddItem = false;
                }
            }
            // Price
            if (min && item.price < min) {
                shouldAddItem = false;
            }
            if (max && item.price > max) {
                shouldAddItem = false;
            }
            // Search Query
            if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                shouldAddItem = false;
            }
            // Condition
            if (condition && !condition.includes(item.condition)) {
                shouldAddItem = false;
            }
            // Delivery Method
            if (deliveryMethod && !deliveryMethod.includes(item.deliveryMethod)) {
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
                query: req.query
            });
        } else {
            res.render("noItemsFound.ejs", {
                title: title,
                tags: filterTags,
                user: req.user,
                query: req.query
            })
        }
        
    }
}
