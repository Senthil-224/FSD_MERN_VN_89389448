const express = require('express');
const studentRoutes = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/studentsControl");

// RESTful user routes
studentRoutes.get("/users", getAllUsers);
studentRoutes.get("/users/:id", getUserById);
studentRoutes.post("/users", createUser);
studentRoutes.put("/users/:id", updateUser);
studentRoutes.delete("/users/:id", deleteUser);

module.exports = studentRoutes;