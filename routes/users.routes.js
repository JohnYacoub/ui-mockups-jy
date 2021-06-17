const express = require("express");
const users = express.Router();
const usersController = require("../controllers/UserController");

users.get('/user',usersController.getUsersList);

module.exports = users;