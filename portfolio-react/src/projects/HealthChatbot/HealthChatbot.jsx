import React, { useState, useEffect, useRef } from 'react';
import './HealthChatbot.css';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const API_VERSION = 'v1';
const MODEL_NAME = 'gemini-1.5-flash';
const API_ENDPOINT = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
const MAX_HISTORY_LENGTH = 10;

function HealthChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: '🧑‍💻 Hello👋! I\'m Smash Assistant, your AI Health Assistant 👨‍⚕️. I can provide general health information. How can I help you today? ⚠️ Remember, I\'m not a substitute for professional medical care.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "user",
      parts: [{
        text: `You are Rapid, an AI health assistant. Follow these rules:
        1. Provide accurate, evidence-based health information
        2. For serious symptoms, advise professional medical help
        3. Use clear, simple language
        4. Never diagnose - only suggest possibilities
        5. Always include: "This is not medical advice"
        6. Current date: ${new Date().toLocaleDateString()}`
      }]
    },
    {
      role: "model",
      parts: [{
        text: "🧑‍💻 Hello👋! I'm Smash Assistant, your AI Health Assistant 👨‍⚕️. I can provide general health information. How can I help you today? ⚠️ Remember, I'm not a substitute for professional medical care."
      }]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showSuggestions = () => {
    const suggestions = [
      "First aid for cuts",
      "How to treat a fever",
      "Signs of dehydration",
      "When to see a doctor"
    ];
    
    return (
      <div className="suggestions">
        <p>Try asking:</p>
        <div className="suggestion-buttons">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-btn"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Add user message to conversation history
      const newHistory = [
        ...conversationHistory,
        {
          role: "user",
          parts: [{ text: userMessage }]
        }
      ];

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: newHistory
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text;

      // Add bot response to UI
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);

      // Update conversation history
      const updatedHistory = [
        ...newHistory,
        {
          role: "model",
          parts: [{ text: botResponse }]
        }
      ];

      // Keep history limited
      if (updatedHistory.length > MAX_HISTORY_LENGTH) {
        setConversationHistory([
          updatedHistory[0], // Keep system instruction
          ...updatedHistory.slice(-MAX_HISTORY_LENGTH)
        ]);
      } else {
        setConversationHistory(updatedHistory);
      }

      setIsOnline(true);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: `⚠️ Sorry, I encountered an error. ${error.message}. Please try again.`
      }]);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="health-chatbot">
      <div className="chat-container">
        <header className="chat-header">
          <div className="header-content">
            <span className="logo">AI Health Assistant</span>
            <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              ● {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </header>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}-message`}>
              <div className="message-content">{message.content}</div>
              <div className="message-time">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          {messages.length === 1 && showSuggestions()}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            id="userInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your health question..."
            disabled={isLoading}
            autoComplete="off"
          />
          <button 
            className="send-button" 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>

        <div className="disclaimer">
          <small>Note: This AI assistant provides general health information only. It's not a substitute for professional medical advice.</small>
        </div>
      </div>
    </div>
  );
}

export default HealthChatbot;
