import React, { useState, useEffect } from 'react';

const ItemForm = ({ onSubmit, editingItem, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: '',
    contactInfo: '',
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        itemName: editingItem.itemName || '',
        description: editingItem.description || '',
        type: editingItem.type || 'Lost',
        location: editingItem.location || '',
        date: editingItem.date ? editingItem.date.split('T')[0] : '',
        contactInfo: editingItem.contactInfo || '',
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingItem) {
      setFormData({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        date: '',
        contactInfo: '',
      });
    }
  };

  return (
    <div className="item-form-card">
      <h3>{editingItem ? '✏️ Edit Item' : '➕ Report New Item'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              placeholder="e.g. Blue Water Bottle"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the item in detail..."
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g. Library, Block A"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="contactInfo">Contact Info</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            placeholder="Phone number or email"
            value={formData.contactInfo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Update Item' : 'Submit Report'}
          </button>
          {editingItem && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
