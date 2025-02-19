const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied, Please Contact Admin' });
    }

    try {
        const decode =jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyToken;