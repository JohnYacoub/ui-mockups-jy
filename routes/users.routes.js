const express = require("express");
const users = express.Router();
const usersController = require("../controllers/UserController");

users.get('/users',usersController.getUsersList);

module.exports = users;