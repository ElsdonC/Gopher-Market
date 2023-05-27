const ItemModel = require("../models/items");
const UserModel = require("../models/user");

module.exports = {
    getIndex: async (req, res) => {
        const items = await ItemModel.find();
        res.render("index.ejs", {
            items: items,
            user: req.user,
            title: null,
        });
    },
    getTextbooks: async (req, res) => {
        const items = await ItemModel.find({ category: "textbooks" });
        res.render("index.ejs", {
            items: items,
            user: req.user,
            title: "Textbooks",
        });
    },
    getSchoolSupplies: async (req, res) => {
        const items = await ItemModel.find({ category: "school-supplies" });
        res.render("index.ejs", {
            items: items,
            user: req.user,
            title: "School Supplies",
        });
    },
    getElectronics: async (req, res) => {
        const items = await ItemModel.find({ category: "electronics" });
        res.render("index.ejs", {
            items: items,
            user: req.user,
            title: "Electronics",
        });
    },
    getFurnitureAppliances: async (req, res) => {
        const items = await ItemModel.find({
            category: "furniture-appliances",
        });
        res.render("index.ejs", {
            items: items,
            user: req.user,
            title: "Furniture & Appliances",
        });
    },
    getClothing: async (req, res) => {
        const items = await ItemModel.find({ category: "clothing" });
        res.render("index.ejs", {
            items: items,
            user: req.user,
            title: "Clothing",
        });
    },
    getKitchenware: async (req, res) => {
        const items = await ItemModel.find({ category: "kitchenware" });
        res.render("index.ejs", {
            items: items,
            user: req.user,
            title: "Kitchenware",
        });
    },
    filterPrice: async (req, res) => {
        const minPrice = req.body.min;
        const maxPrice = req.body.max;

        let items;

        if (minPrice && maxPrice) {
            // find items with prices between minPrice and maxPrice
            items = await ItemModel.find({
                price: { $gte: minPrice, $lte: maxPrice },
            });
        } else if (minPrice) {
            // find items with prices greater than or equal to minPrice
            items = await ItemModel.find({ price: { $gte: minPrice } });
        } else if (maxPrice) {
            // find items with prices less than or equal to maxPrice
            items = await ItemModel.find({ price: { $lte: maxPrice } });
        } else {
            // handle case where both minPrice and maxPrice are not provided
            items = await ItemModel.find();
        }

        // render the index.ejs file with the filtered items
        if (minPrice && maxPrice) {
            res.render("index", {
                items: items,
                user: req.user,
                title: `$${minPrice}-$${maxPrice}`,
            });
        } else if (minPrice) {
            res.render("index", {
                items: items,
                user: req.user,
                title: `Over $${minPrice}`,
            });
        } else if (maxPrice) {
            res.render("index", {
                items: items,
                user: req.user,
                title: `Under $${maxPrice}`,
            });
        }
    },
    searchItems: async (req, res) => {
        const searchQuery = req.query.q;
        let items = await ItemModel.find();
        let searchItems = items;

        if (searchQuery) {
            // Filter items by name using regex
            searchItems = [];
            items.forEach((item) => {
                if (
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) && req.body.items.includes(item.name)
                ) {
                    searchItems.push(item);
                }
            });
        }

        if (searchItems.length > 0) {
            const html = searchItems
                .map((item) => {
                    return `
                    
                        <div class="card d-inline-block mb-4">
                            <a href="/item/${item.name}" class="itemLink">
                                <img src="../${
                                    item.imagePath
                                }" class="card-img-top" alt="${item.name}" />
                            
                            <div class="card-body">
                            <h5 class="card-title">$${item.price.toFixed(2)}</h5>
                            <p class="card-text">${item.name}</p>
                            <div class="d-flex flex-row align-items-center">
                                <span class="location">${item.location}</span>
                                <span class="card-likes">
                                    ${item.starCount} ${
                        item.starCount == 1 ? "like" : "likes"
                    }
                                </span>
                            </div>
                            </div>
                            </a>
                        </div>
                    
                `;
                })
                .join("");

            // Send the HTML back to the client
            res.send(html);
        } else {
            const html = `
                <h1>No Items Found!</h1>
            `;
            res.send(html);
        }
    },
    getItem: async (req, res) => {
        const name = req.params.name;
        const item = await ItemModel.find({ name: name });
        var seller = await UserModel.find({ googleId: item[0].createdById });
        
        
        res.render("uniqueItem", {
            item: item[0],
            user: req.user,
            title: item[0].name,
            seller: seller[0],
        });
    },
    getEastBankItems: async (req, res) => {
        const items = await ItemModel.find({ location: "eastbank" });
        res.render("index", { items: items, user: req.user, title: "East Bank Items"})
    },
    getWestBankItems: async (req, res) => {
        const items = await ItemModel.find({ location: "westbank" });
        res.render("index", { items: items, user: req.user, title: "West Bank Items"})
    },
    getDinkyTownItems: async (req, res) => {
        const items = await ItemModel.find({ location: "dinkytown" });
        res.render("index", { items: items, user: req.user, title: "Dinkytown Items"})
    },
    getOffCampusItems: async (req, res) => {
        const items = await ItemModel.find({ location: "off-campus" });
        res.render("index", { items: items, user: req.user, title: "Off Campus Items"})
    }
};
