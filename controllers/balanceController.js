const db = require('../models');

exports.getByCustomer = async (req, res) => {
  try {
    const balance = await db.Balance.findOne({
      where: { customer_id: req.params.id }
    });

    if (!balance) return res.status(404).json({ message: 'Saldo tidak ditemukan' });
    res.json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
