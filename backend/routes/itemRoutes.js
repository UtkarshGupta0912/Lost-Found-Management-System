const express = require('express');
const router = express.Router();
const {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
} = require('../controllers/itemController');
const { protect } = require('../middleware/auth');

// Search route MUST be before /:id to prevent "search" being treated as an ID
router.get('/search', protect, searchItems);

router.route('/')
  .post(protect, addItem)
  .get(protect, getAllItems);

router.route('/:id')
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;
