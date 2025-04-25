const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
  register: async (req, res) => {
    const { name, email, password, banksampah_id, role } = req.body;

    try {
      // Cek apakah Bank Sampah tersedia
      const bank = await db.BankSampah.findByPk(banksampah_id);
      if (!bank) {
        return res.status(400).json({ message: 'Bank Sampah tidak ditemukan' });
      }

      // Cek apakah email sudah digunakan
      const existing = await db.User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Buat user baru
      const user = await db.User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
        banksampah_id
      });

      res.status(201).json({
        message: 'Registrasi berhasil',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          banksampah_id: user.banksampah_id
        }
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Password salah' });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, banksampah_id: user.banksampah_id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          banksampah_id: user.banksampah_id
        },
        users: req.session.user
      });


    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Gagal logout' });
      }
      res.clearCookie('connect.sid'); // Hapus cookie sesi
      res.json({ message: 'Logout berhasil' });
    });
  }
};

module.exports = AuthController;
