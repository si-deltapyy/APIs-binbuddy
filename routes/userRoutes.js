const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authM = require('../middleware/authMiddleware');

// GET all
router.get('/info', authM, UserController.getInfo);

module.exports = router;
