const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const verifyToken = require("../middlewares/auth");
require("dotenv").config();

const router = express.Router();

// Generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign({ username: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// Generate Refresh Token
const generateRefreshToken = async (user) => {
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    // Simpan refresh token ke database
    await db.query("INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))", 
                   [user.id, refreshToken]);

    return refreshToken;
};

// Login
router.post("/login", async (req, res) => {
    const { email, password, id } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        const user = rows[0];

        // Bandingkan password yang dimasukkan dengan password di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        // Buat token JWT
        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        return res.json({
            response: {
              accessToken,
              refreshToken
            },
            metadata: {
              message: "ok",
              status: 200
            }
          });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                                        [name, email, hashedPassword]);

        res.json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Logout (Blacklist Token)
router.post("/logout", verifyToken, async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "Token tidak ditemukan" });
    }

    // Simpan token ke database blacklist
    await db.query("INSERT INTO blacklisted_tokens (token) VALUES (?)", [token]);

    res.json({ message: "Logout berhasil, token diblokir" });
});

// Middleware untuk memeriksa blacklist token
const checkBlacklist = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan." });
    }

    // Periksa apakah token ada di daftar blacklist
    const [rows] = await db.query("SELECT * FROM blacklisted_tokens WHERE token = ?", [token]);
    if (rows.length > 0) {
        return res.status(401).json({ message: "Token tidak valid, silakan login kembali." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token tidak valid." });
        req.user = decoded;
        next();
    });
};

// Refresh Token
router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token diperlukan" });
    }

    try {
        const [rows] = await db.query("SELECT * FROM refresh_tokens WHERE token = ?", [refreshToken]);
        if (rows.length === 0) {
            return res.status(403).json({ message: "Refresh token tidak valid" });
        }

        const storedToken = rows[0];

        // Verifikasi refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Refresh token tidak valid" });

            // Generate access token baru
            const user = { id: decoded.id, email: storedToken.email };
            const newAccessToken = generateAccessToken(user);

            res.json({ accessToken: newAccessToken });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Hapus Refresh Token (Logout dari Semua Perangkat)
router.post("/logout/all", async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User ID diperlukan" });
    }

    // Hapus semua refresh token user dari database
    await db.query("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);

    res.json({ message: "Logout dari semua perangkat berhasil" });
});

// Contoh endpoint yang butuh autentikasi
router.get("/profile", checkBlacklist, (req, res) => {
    res.json({ message: `Selamat datang, ${req.user.username}` });
});

module.exports = router;
