const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userController");
// appel lel controller
//const userController = require("../Controllers/userController");
const User=require('../models/userModel');
 


userRoutes.get("/getAllusers", userController.getAllUsers); //getAllUsers()
userRoutes.get("/getOneUser/:id", userController.getOneUser); //getAllUsers()
userRoutes.post("/createUser", userController.createUser); // createUser()
userRoutes.delete("/deleteUser/:id", userController.deleteUser); // deletUser()
userRoutes.put("/editUser/:id", userController.editUser); //   editUser()

module.exports = userRoutes;