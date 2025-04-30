const db = require('../models'); // pastikan path benar

const BankSampahController = {
    getAllBankSampah: async (req, res) => {
      try {
        const data = await db.BankSampah.findAll();
        res.json(data);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // controllers/banksampahController.js
    getName: async (req, res) => {
        try {
        const data = await db.BankSampah.findAll({
            attributes: ['id', 'name']
        });
        res.json(data);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    },
    
  
    getBankSampahById: async (req, res) => {
      try {
        const data = await db.BankSampah.findByPk(req.params.id);
        if (!data) return res.status(404).json({ message: 'Data Tidak Ditemukan' });
        res.json(data);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
  
    createBankSampah: async (req, res) => {
      try {
        const data = await db.BankSampah.create(req.body);
        res.status(201).json(data);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    },
  
    updateBankSampah: async (req, res) => {
      try {
        const data = await db.BankSampah.update(req.body, {
          where: { id: req.params.id }
        });
        res.json({ message: 'Updated successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
  
    deleteBankSampah: async (req, res) => {
      try {
        await db.BankSampah.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  };
  
  module.exports = BankSampahController;