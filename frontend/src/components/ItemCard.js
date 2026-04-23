import React from 'react';

const ItemCard = ({ item, onEdit, onDelete, currentUserId }) => {
  const isOwner = item.user && (item.user._id === currentUserId || item.user === currentUserId);
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`item-card ${item.type === 'Lost' ? 'item-lost' : 'item-found'}`}>
      <div className="item-card-header">
        <h4 className="item-name">{item.itemName}</h4>
        <span className={`badge ${item.type === 'Lost' ? 'badge-lost' : 'badge-found'}`}>
          {item.type === 'Lost' ? '🔴 Lost' : '🟢 Found'}
        </span>
      </div>
      <p className="item-description">{item.description}</p>
      <div className="item-details">
        <div className="item-detail">
          <span className="detail-icon">📍</span>
          <span>{item.location}</span>
        </div>
        <div className="item-detail">
          <span className="detail-icon">📅</span>
          <span>{formattedDate}</span>
        </div>
        <div className="item-detail">
          <span className="detail-icon">📞</span>
          <span>{item.contactInfo}</span>
        </div>
        {item.user && item.user.name && (
          <div className="item-detail">
            <span className="detail-icon">👤</span>
            <span>{item.user.name}</span>
          </div>
        )}
      </div>
      {isOwner && (
        <div className="item-card-actions">
          <button className="btn btn-edit" onClick={() => onEdit(item)}>
            ✏️ Edit
          </button>
          <button className="btn btn-delete" onClick={() => onDelete(item._id)}>
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
