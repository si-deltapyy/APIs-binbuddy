const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Validasi
  if (!email || !password) {
    return res.status(400).json({ message: 'email dan password wajib diisi' });
  }

  // Cek user sudah ada
  db.query('SELECT * FROM users WHERE name = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Query error' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ message: 'Gagal menyimpan user' });

      return res.status(201).json({ message: 'Registrasi berhasil' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Query error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    return res.status(200).json({ message: 'Login berhasil' });
  });
};
