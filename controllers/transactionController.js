const db = require('../models');
const { validationResult } = require('express-validator');

exports.createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { customer_id, type, transaction_date, details } = req.body;

  try {
    const transaction = await db.Transaction.create({
      customer_id,
      user_id: req.user.id, // dari JWT
      type,
      transaction_date,
      total_amount: 0
    });

    let total = 0;

    for (const detail of details) {
      const price = await db.WastePrice.findOne({
        where: { waste_item_id: detail.waste_item_id },
        order: [['effective_date', 'DESC']]
      });

      const subtotal = detail.weight * price.price_per_kg;
      total += subtotal;

      await db.TransactionDetail.create({
        transaction_id: transaction.id,
        waste_item_id: detail.waste_item_id,
        weight: detail.weight,
        price_per_kg: price.price_per_kg,
        subtotal
      });
    }

    transaction.total_amount = total;
    await transaction.save();

    res.status(201).json({ message: 'Transaksi berhasil', transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll({
      include: [
        { model: db.Customer },
        { model: db.User },
        {
          model: db.TransactionDetail,
          include: [db.WasteItem]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await db.Transaction.findByPk(req.params.id, {
      include: [
        { model: db.Customer },
        { model: db.User },
        {
          model: db.TransactionDetail,
          include: [db.WasteItem]
        }
      ]
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyTransactions = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: db.TransactionDetail, include: [db.WasteItem] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
