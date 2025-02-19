const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Dummy user (Gantilah dengan autentikasi dari database)
    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: "Login gagal! Username atau password salah." });
    }
});

module.exports = router;
