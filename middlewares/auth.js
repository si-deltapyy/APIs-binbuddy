const jwt = require('jsonwebtoken');
require('dotenv').config();

let blacklistedTokens = new Set();
// Middleware untuk mengecek token di blacklist
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan." });

    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ message: "Token sudah tidak valid, silakan login kembali." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token tidak valid." });
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;


