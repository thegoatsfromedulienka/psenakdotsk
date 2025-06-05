import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("//localhost:3000");
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(); // Fetch messages initially
    const intervalId = setInterval(fetchMessages, 100); // Fetch messages every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const sendMessage = async () => {
    if (!name || !message) {
      alert("Please enter both a name and a message.");
      return;
    }

    try {
      const response = await fetch(`//localhost:3000/send/${encodeURIComponent(name)}/${encodeURIComponent(message)}`, {
        method: 'POST', // Assuming you want to use POST method
      });

      if (response.ok) {
        setMessage(''); // Clear the message input after sending
      } else {
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Message Board</h1>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </>
  );
}

export default App;
