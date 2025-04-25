const db = require('../models');

const CustomerController = {
  getAll: async (req, res) => {
    try {
      const data = await db.Customer.findAll({ include: db.BankSampah });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await db.Customer.findByPk(req.params.id);
      if (!data) return res.status(404).json({ message: 'Customer tidak ditemukan' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = await db.Customer.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      await db.Customer.update(req.body, { where: { id: req.params.id } });
      res.json({ message: 'Customer diperbarui' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await db.Customer.destroy({ where: { id: req.params.id } });
      res.json({ message: 'Customer dihapus' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = CustomerController;
