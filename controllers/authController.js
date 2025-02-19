const db = require('../config/db');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Username atau password salah' });
        } 
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}