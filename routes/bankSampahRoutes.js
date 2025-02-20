const express = require('express');
const router = express.Router();
const banksampahController = require('../controllers/bankSampahController');

router.get('/:id', banksampahController.getBankSampahById);
router.get('/', banksampahController.getAllBankSampah);

module.exports = router;