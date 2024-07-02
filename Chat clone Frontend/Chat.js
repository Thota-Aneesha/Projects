import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import '@fortawesome/fontawesome-free/css/all.min.css';  
import { getChatResponse } from '../services/api'  
import './Chat.css';  

const Chat = () => {
  const [messages, setMessages] = useState([]);  
  const [input, setInput] = useState('');  

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (input.trim()) {  // Check if the input is not empty
      const newMessage = { sender: 'user', text: input };  
      setMessages([...messages, newMessage]);  // Add the user's message to the message list

      try {
        const response = await getChatResponse(input);  
        const botMessage = { sender: 'bot', text: response.reply };  
        setMessages((prevMessages) => [...prevMessages, botMessage]);  
        setInput('');  // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error);  // Log any errors
      }
    }
  };

  // Function to handle prompt button clicks
  const handlePromptClick = (prompt) => {
    setInput(prompt);  
    handleSendMessage();  
  };

  return (
    <div className="chat-container container">
      <div className="chat">
        {messages.map((message, index) => (
          <div key={index} className={`alert ${message.sender === 'user' ? 'alert-primary' : 'alert-secondary'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-group my-3 space-between">
        {/* Input field and send button can be added here */}
      </div>
      <div className="suggestions mb-3">
        {/* Render prompt buttons */}
        {['What is OpenAPI?', 'photosynthesis process', 'World war', 'Generative AI', 'How do you build a Discord bot?'].map((prompt, index) => (
          <button key={index} className="btn btn-outline-secondary m-1" onClick={() => handlePromptClick(prompt)}>
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chat;
