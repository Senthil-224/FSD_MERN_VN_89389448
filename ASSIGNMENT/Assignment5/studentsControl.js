const Users = require("../models/studentmodels");

// GET /users
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// GET /users/:id
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// POST /users
const createUser = async (req, res) => {
    try {
        const { name, age, email, password } = req.body;
        if (!name || !email || age === undefined || !password) {
            return res.status(400).json({ msg: "name, age, email and password are required" });
        }
        const existing = await Users.findOne({ email });
        if (existing) return res.status(409).json({ msg: "Email already exists" });
        const user = await Users.create({ name, age, email, password });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// PUT /users/:id
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await Users.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ msg: "User not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Users.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ msg: "User not found" });
        res.json({ msg: "User deleted", user: deleted });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};