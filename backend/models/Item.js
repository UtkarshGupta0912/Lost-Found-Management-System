const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Please add an item name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  type: {
    type: String,
    enum: ['Lost', 'Found'],
    required: [true, 'Please specify Lost or Found'],
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  contactInfo: {
    type: String,
    required: [true, 'Please add contact info'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Item', itemSchema);
