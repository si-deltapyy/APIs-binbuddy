const db = require('../models');

const UserController = {
  getInfo: async (req, res) => {
    try {
      const userId = req.session.user.id; // Ambil dari JWT (middleware auth)

      const [result] = await db.sequelize.query(
        `SELECT u.name, u.role, u.email, b.amount, bp.points
         FROM users u
         LEFT JOIN balances b ON b.user_id = u.id
         LEFT JOIN bpoin bp ON bp.user_id = u.id
         WHERE u.id = ?`,
        {
          replacements: [userId],
          type: db.Sequelize.QueryTypes.SELECT
        }
      );

      if (!result) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }

      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = UserController;
