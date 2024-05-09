const UserController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/register', UserController.register);

module.exports = router;


