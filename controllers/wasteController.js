const db = require('../models');

const WasteController = {

  // === Waste Item ===
  getAllItems: async (req, res) => {
    try {
      const data = await db.WasteItem.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getItemById: async (req, res) => {
    try {
      const item = await db.WasteItem.findByPk(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item tidak ditemukan' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createItem: async (req, res) => {
    try {
      const data = await db.WasteItem.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      await db.WasteItem.update(req.body, { where: { id: req.params.id } });
      res.json({ message: 'Item berhasil diperbarui' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      await db.WasteItem.destroy({ where: { id: req.params.id } });
      res.json({ message: 'Item berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = WasteController;
