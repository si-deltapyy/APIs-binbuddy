const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createTransaction);
router.get('/', auth, controller.getAllTransactions);
router.get('/me', auth, controller.getMyTransactions);
router.get('/:id', auth, controller.getTransactionById);

module.exports = router;
