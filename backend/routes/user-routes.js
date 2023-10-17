const express = require("express");
const {
  getUsersController,
  addUsersController,
  findUserByEmailController,
} = require("../controllers/user-controller");
const userRoutes = express.Router();

userRoutes.get("/get-users", getUsersController);
userRoutes.post("/add-user", addUsersController);
userRoutes.post("/get-user", findUserByEmailController);
module.exports = userRoutes;
