const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8100', // ⬅️ Sesuaikan dengan port Ionic kamu
  credentials: true
}));

app.use(bodyParser.json());

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, // 2 jam
      httpOnly: true,
      secure: false // Ganti ke true jika pakai HTTPS
    }
  }));

app.use((req, res, next) => {
if (req.session.user) {
    req.session.touch();
}
next();
});

app.use("/api", routes);

app.get('/',(req, res) => {
    res.json({ message: 'Welcome to BinBuddy APIs, please register to access our APIs' });
});


module.exports = app;