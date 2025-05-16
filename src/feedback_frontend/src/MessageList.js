// MessageList.js
import React from 'react';

const MessageList = ({ messages, onDelete }) => {
  return (
    <div>
      <h2>My Tasks and Notes</h2>
      {messages.length === 0 ? (
        <p>No tasks yet. Add a new task above!</p>
      ) : (
        <ul style={{ 
          listStyleType: 'none', 
          padding: 0,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {messages.map((msg) => (
            <li key={msg.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              margin: '0.5rem 0',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <span>{msg.text}</span>
              <button 
                className="delete-btn" 
                onClick={() => onDelete(msg.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;