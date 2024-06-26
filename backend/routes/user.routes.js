const UserController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/instructor", UserController.getAllUsers);

router.get("/admin", UserController.getAdmin);

module.exports = router;
