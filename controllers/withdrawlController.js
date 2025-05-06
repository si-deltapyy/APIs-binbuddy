const db = require('../models');

const withdrawController = {

    getByCustomer: async (req, res) => {
        try {
          const userId = req.session.user.id;
          const balance = await db.Withdraw.findAll({
            where: { customer_id: userId }
          });
      
          if (!balance) return res.status(404).json({ message: 'Saldo tidak ditemukan' });
          res.json(balance);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      },

    getAll: async (req, res) => {
        try {
        const data = await db.Withdraw.findAll();
        res.json(data);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    },

    getById: async (req, res) => {
        try {
        const data = await db.Withdraw.findByPk(req.params.id);
        if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
        res.json(data);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    },

    create: async (req, res) => {
        try {
        const data = await db.Withdraw.create(req.body);
        res.status(201).json(data);
        } catch (err) {
        res.status(400).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
        await db.Withdraw.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Withdraw berhasil diperbarui' });
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
        await db.Withdraw.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Withdraw berhasil dihapus' });
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    }
};

module.exports = withdrawController;