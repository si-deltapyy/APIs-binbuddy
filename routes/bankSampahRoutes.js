const express = require('express');
const router = express.Router();
const BankSampahController = require('../controllers/bankSampahController');
const authM = require('../middleware/authMiddleware');

// GET all
router.get('/', authM, BankSampahController.getAllBankSampah);
router.get('/:id/data', BankSampahController.getBankSampahById);
router.post('/', BankSampahController.createBankSampah);
router.put('/:id', BankSampahController.updateBankSampah);
router.delete('/:id', BankSampahController.deleteBankSampah);

module.exports = router;
