const { Store, User, Rating } = require('../models');

// ✅ Use exports.name to ensure multiple functions are exported correctly
exports.createStore = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const newStore = await Store.create({ name, email, address });
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ message: "Error creating store", error: error.message });
    }
};

exports.listStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stores" });
    }
};

exports.getStoresForUser = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

exports.rateStore = async (req, res) => {
    // Your rating logic here
    res.status(200).json({ message: "Rating submitted" });
};

exports.getStoreForOwner = async (req, res) => {
    try {
        const store = await Store.findOne({ where: { ownerId: req.user.id } });
        res.json(store);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};