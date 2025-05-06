const db = require('../models');

exports.getByCustomer = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const balance = await db.Balance.findOne({
      where: { user_id: userId }
    });

    if (!balance) return res.status(404).json({ message: 'Saldo tidak ditemukan' });
    res.json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
