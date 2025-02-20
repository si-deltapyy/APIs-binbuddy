const db = require('../config/db');

exports.getAllBankSampah = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM banksampah');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getBankSampahById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM banksampah WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Bank Sampah tidak ditemukan' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createBankSampah = async (req, res) => {
    const { name, pengelola_name, address } = req.body;
    try {
        const [rows] = await db.query('INSERT INTO banksampah (name, pengelola_name, address) VALUES (?, ?, ?)', [name, pengelola_name, address]);
        res.json({ id: rows.insertId, nama, alamat, telepon });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}