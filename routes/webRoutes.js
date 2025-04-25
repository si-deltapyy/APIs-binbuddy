const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Contoh route yang hanya bisa diakses setelah login
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Selamat datang!', user: req.session.user });
});

module.exports = router;
