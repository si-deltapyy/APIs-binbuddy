const dotenv = require('dotenv');
dotenv.config();


const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,       // ganti sesuai konfigurasi lokalmu
  database: process.env.DB_NAME   // nama database
});

db.connect((err) => {
  if (err) throw err;
  console.log('Terhubung ke database MySQL!');
});

module.exports = db;