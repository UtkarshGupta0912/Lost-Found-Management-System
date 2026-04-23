const Item = require('../models/Item');

// @desc    Add a new item
// @route   POST /api/items
// @access  Private
const addItem = async (req, res) => {
  try {
    const { itemName, description, type, location, date, contactInfo } = req.body;

    if (!itemName || !description || !type || !location || !contactInfo) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const item = await Item.create({
      itemName,
      description,
      type,
      location,
      date: date || Date.now(),
      contactInfo,
      user: req.user._id,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Private
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get item by ID
// @route   GET /api/items/:id
// @access  Private
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name email');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private (only owner)
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user is the owner
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private (only owner)
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user is the owner
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search items by name or category
// @route   GET /api/items/search?name=xyz
// @access  Private
const searchItems = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: 'Please provide a search term' });
    }

    const items = await Item.find({
      $or: [
        { itemName: { $regex: name, $options: 'i' } },
        { description: { $regex: name, $options: 'i' } },
        { type: { $regex: name, $options: 'i' } },
      ],
    }).populate('user', 'name email').sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
};
