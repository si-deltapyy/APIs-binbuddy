const db = require('../config/db');

exports.getAllBankSampah = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM banksampah');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// exports.createBankSampah = async (req, res) => {
//     const { nama, alamat, telepon } = req.body;
//     try {
//         const [rows] = await db.query('INSERT INTO banksampah (nama, alamat, telepon) VALUES (?, ?, ?)', [nama, alamat, telepon]);
//         res.json({ id: rows.insertId, nama, alamat, telepon });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }