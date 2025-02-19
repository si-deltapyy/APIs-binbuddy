const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');

router.get('/', verifyToken, userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;