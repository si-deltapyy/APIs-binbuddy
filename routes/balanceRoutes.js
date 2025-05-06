const express = require('express');
const router = express.Router();
const controller = require('../controllers/balanceController');
const authM = require('../middleware/authMiddleware');

router.get('/trx', authM, controller.getByCustomer); // /api/balances/:id

module.exports = router;
