import React, { useState, useEffect } from 'react';
import { getItems, addItem, updateItem, deleteItem, searchItems } from '../services/api';
import ItemForm from './ItemForm';
import ItemCard from './ItemCard';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [filterType, setFilterType] = useState('All');

  const currentUserId = localStorage.getItem('userId');

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await getItems();
      setItems(data);
    } catch (err) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      setError('');
      if (editingItem) {
        await updateItem(editingItem._id, formData);
        showSuccess('Item updated successfully!');
        setEditingItem(null);
      } else {
        await addItem(formData);
        showSuccess('Item reported successfully!');
      }
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        showSuccess('Item deleted successfully!');
        fetchItems();
      } catch (err) {
        setError(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    try {
      if (value.trim()) {
        const { data } = await searchItems(value);
        setItems(data);
      } else {
        fetchItems();
      }
    } catch (err) {
      setError('Search failed');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredItems = filterType === 'All'
    ? items
    : items.filter((item) => item.type === filterType);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📋 Dashboard</h2>
        <p>Report and manage lost & found items on campus</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <ItemForm
        onSubmit={handleAddOrUpdate}
        editingItem={editingItem}
        onCancelEdit={() => setEditingItem(null)}
      />

      <div className="items-section">
        <div className="items-header">
          <h3>📦 All Reported Items ({filteredItems.length})</h3>
          <div className="items-controls">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={handleSearch}
                id="searchInput"
              />
            </div>
            <div className="filter-buttons">
              <button
                className={`btn btn-filter ${filterType === 'All' ? 'active' : ''}`}
                onClick={() => setFilterType('All')}
              >
                All
              </button>
              <button
                className={`btn btn-filter ${filterType === 'Lost' ? 'active' : ''}`}
                onClick={() => setFilterType('Lost')}
              >
                🔴 Lost
              </button>
              <button
                className={`btn btn-filter ${filterType === 'Found' ? 'active' : ''}`}
                onClick={() => setFilterType('Found')}
              >
                🟢 Found
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h4>No items found</h4>
            <p>Be the first to report a lost or found item!</p>
          </div>
        ) : (
          <div className="items-grid">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
