const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Middleware to parse JSON
app.use(express.json());

// Generate JWT Token
app.post('/client-token/auth', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    const payload = { username };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    
    res.json({ token });
});

// Verify JWT Token Middleware
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ resp: '403', error: 'Mau cari apa bos, mau masuk!!' });
    
    try {
        const verified = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Protected Route Example
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You have accessed a protected route', user: req.user });
});

app.get('/', verifyToken, (req, res) => {
    res.json({ message: 'You have accessed a protected route', user: req.user });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
