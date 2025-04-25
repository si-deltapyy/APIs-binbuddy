const dotenv = require('dotenv');
dotenv.config();


const mysql = require('mysql2/promise');

const db = mysql.createPool({ 
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,       // ganti sesuai konfigurasi lokalmu
  database: process.env.DB_NAME   // nama database
});

module.exports = db;