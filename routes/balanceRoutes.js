const express = require('express');
const router = express.Router();
const controller = require('../controllers/balanceController');
const auth = require('../middleware/auth');

router.get('/:id', auth, controller.getByCustomer); // /api/balances/:id

module.exports = router;
