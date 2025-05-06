const express = require('express');
const router = express.Router();
const controller = require('../controllers/wasteController');
const auth = require('../middleware/auth');
const authM = require('../middleware/authMiddleware');

// Waste Items
router.get('/items', authM, controller.getAllItems);
router.get('/items/:id', auth, controller.getItemById);
router.post('/items', auth, controller.createItem);
router.put('/items/:id', auth, controller.updateItem);
router.delete('/items/:id', auth, controller.deleteItem);

module.exports = router;
