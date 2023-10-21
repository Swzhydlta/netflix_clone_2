const express = require("express");
const {
  getUsersController,
  addUsersController,
  findUserByEmailController,
  addOrUpdateUserShows,
} = require("../controllers/user-controller");

const userRoutes = express.Router();

userRoutes.post("/add-user", addUsersController);
userRoutes.post("/get-user", findUserByEmailController);
userRoutes.post("/update-shows", addOrUpdateUserShows);

module.exports = userRoutes;
