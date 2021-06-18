const express = require("express");
const users = express.Router();
const usersController = require("../controllers/UserController");

users.get('/',usersController.getUsersList);
users.post('/add',usersController.addUser);
users.put('/edit/:id',usersController.editUser);
users.delete('/remove',usersController.deleteUser);

module.exports = users;