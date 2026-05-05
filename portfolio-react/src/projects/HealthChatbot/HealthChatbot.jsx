import React, { useState, useEffect, useRef } from 'react';
import './HealthChatbot.css';

// Using v1beta for better system instruction support
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const MODEL_NAME = 'gemini-2.5-flash'; 
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
const MAX_HISTORY_LENGTH = 10;

function HealthChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "🧑‍💻 Hello👋! I'm Smash Assistant, your AI Health Assistant 👨‍⚕️. I can provide general health information. How can I help you today? ⚠️ Remember, I'm not a substitute for professional medical care."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const systemInstruction = `You are Rapid, an AI health assistant. Follow these rules:
1. Provide accurate, evidence-based health information.
2. For serious symptoms, advise professional medical help.
3. Use clear, simple language.
4. Never diagnose - only suggest possibilities.
5. Always include: "This is not medical advice".
6. Current date: ${new Date().toLocaleDateString()}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Format history correctly: Gemini requires alternating 'user' and 'model' roles
      const contents = [];
      
      for (let i = 0; i < conversationHistory.length; i += 2) {
        if (conversationHistory[i] && conversationHistory[i+1]) {
          contents.push({
            role: "user",
            parts: [{ text: conversationHistory[i] }]
          });
          contents.push({
            role: "model",
            parts: [{ text: conversationHistory[i+1] }]
          });
        }
      }
      
      // Add current user message
      contents.push({
        role: "user",
        parts: [{ text: userMessage }]
      });

      const requestBody = {
        // Correct way to pass system instructions in v1beta
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topP: 0.95,
        }
      };

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `API Error: ${response.status}`);
      }

      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                         "I'm sorry, I couldn't generate a response.";

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      
      // Update history (User, then Bot)
      setConversationHistory(prev => {
        const updated = [...prev, userMessage, botResponse];
        return updated.slice(-MAX_HISTORY_LENGTH * 2);
      });

      setIsOnline(true);
    } catch (error) {
      console.error('Detailed Error:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: `⚠️ Error: ${error.message}. Please check your API key and connection.`
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

  const showSuggestions = () => (
    <div className="suggestions">
      <p>Try asking:</p>
      <div className="suggestion-buttons">
        {["First aid for cuts", "How to treat a fever", "Signs of dehydration", "When to see a doctor"].map((s, i) => (
          <button key={i} className="suggestion-btn" onClick={() => handleSuggestionClick(s)}>{s}</button>
        ))}
      </div>
    </div>
  );

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
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}-message`}>
              <div className="message-content">{msg.content}</div>
              <div className="message-time">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot-message">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          
          {messages.length === 1 && showSuggestions()}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
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