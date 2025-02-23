const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign(payload, secretKey, { expiresIn: process.env.JWT_EXPIRES_IN });
}