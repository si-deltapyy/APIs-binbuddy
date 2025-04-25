const { body } = require('express-validator');

exports.createTransactionValidator = [
  body('customer_id')
    .isInt().withMessage('customer_id harus berupa integer')
    .notEmpty().withMessage('customer_id wajib diisi'),

  body('type')
    .isIn(['deposit', 'withdrawal']).withMessage('Tipe transaksi harus deposit atau withdrawal'),

  body('transaction_date')
    .isISO8601().withMessage('Tanggal transaksi tidak valid'),

  body('details')
    .isArray({ min: 1 }).withMessage('Harus ada minimal satu item sampah'),

  body('details.*.waste_item_id')
    .isInt().withMessage('waste_item_id harus berupa integer'),

  body('details.*.weight')
    .isFloat({ gt: 0 }).withMessage('Berat harus lebih dari 0')
];
