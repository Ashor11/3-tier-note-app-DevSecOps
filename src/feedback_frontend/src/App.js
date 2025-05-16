// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from the backend
  async function fetchMessages() {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to handle deletion and update state by re-fetching messages
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/message/${id}`, { method: 'DELETE' });
      fetchMessages();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update handleAddMessage to re-fetch messages rather than expecting a JSON response
  const handleAddMessage = async (message) => {
    try {
      await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      // Instead of using the empty POST response to update state,
      // re-fetch messages from the backend.
      fetchMessages();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container" style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '0 1rem' 
      }}>
        <MessageForm onAddMessage={handleAddMessage} />
        <MessageList messages={messages} onDelete={handleDelete} />
      </div>
      <Footer />
    </div>
  );
}

export default App;