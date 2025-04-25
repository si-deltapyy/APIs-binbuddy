const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // format: Bearer <token>
  if (!token) return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // isi token: id, email, role, dsb
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token tidak valid' });
  }
};





