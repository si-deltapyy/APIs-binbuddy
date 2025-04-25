const express = require('express');
const router = express.Router();
const controller = require('../controllers/wasteController');
const auth = require('../middleware/auth');

// Waste Categories
router.get('/categories', auth, controller.getAllCategories);
router.get('/categories/:id', auth, controller.getCategoryById);
router.post('/categories', auth, controller.createCategory);
router.put('/categories/:id', auth, controller.updateCategory);
router.delete('/categories/:id', auth, controller.deleteCategory);

// Waste Items
router.get('/items', auth, controller.getAllItems);
router.get('/items/:id', auth, controller.getItemById);
router.post('/items', auth, controller.createItem);
router.put('/items/:id', auth, controller.updateItem);
router.delete('/items/:id', auth, controller.deleteItem);

module.exports = router;
