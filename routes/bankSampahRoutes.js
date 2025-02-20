const express = require('express');
const router = express.Router();
const banksampahController = require('../controllers/bankSampahController');
const verifyToken = require('../middlewares/auth');

router.get('/:id', banksampahController.getBankSampahById);
router.get('/', verifyToken, banksampahController.getAllBankSampah);
router.post('/user', verifyToken, banksampahController.createBankSampah);

module.exports = router;