const express = require('express');

const router = express.Router();

const { UserValidator } = require('../validators');
const { UserController } = require('../controllers');

router.post('/', UserValidator.login, UserController.login);

module.exports = router;
