const db = require("../config/db");

// Ambil semua user
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambah user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


