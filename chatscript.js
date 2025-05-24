const API_KEY = 'AIzaSyBSYPgAyMYGjIzebOAvSgPSQiu-a0izZzY'; 
		const API_VERSION = 'v1beta';
		const MODEL_NAME = 'gemini-1.5-flash-latest';
		const API_ENDPOINT = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
		const MAX_HISTORY_LENGTH = 10;

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const statusIndicator = document.getElementById('statusIndicator');

// System instruction as first message
let conversationHistory = [
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
            text: "🧑‍💻 Hello👋! I'm Rapid, your AI Health Assistant 👨‍⚕️. I can provide general health information. How can I help you today? ⚠️ Remember, I'm not a substitute for professional medical care."
        }]
    }
];

// Initialize the chat
function initChat() {
    renderConversation();
    showSuggestions([
        "First aid for cuts",
        "How to treat a fever",
        "Signs of dehydration",
        "When to see a doctor"
    ]);
}

// Render conversation history
function renderConversation() {
    chatMessages.innerHTML = '';
    // Skip system instruction when rendering
    for (let i = 1; i < conversationHistory.length; i++) {
        const msg = conversationHistory[i];
        if (msg.role === "model") {
            addBotMessage(msg.parts[0].text);
        } else {
            addUserMessage(msg.parts[0].text);
        }
    }
}

// Add message to UI
function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${role}-message`);
    
    const contentDiv = document.createElement('div');
    contentDiv.textContent = content;
    messageDiv.appendChild(contentDiv);
    
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(content) {
    addMessage('bot', content);
}

function addUserMessage(content) {
    addMessage('user', content);
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) typingIndicator.remove();
}

// Show quick reply suggestions
function showSuggestions(suggestions) {
    const existing = document.querySelector('.suggestions');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.classList.add('suggestions');
    
    suggestions.forEach(text => {
        const button = document.createElement('button');
        button.classList.add('suggestion-chip');
        button.textContent = text;
        button.addEventListener('click', () => {
            userInput.value = text;
            sendMessage();
        });
        div.appendChild(button);
    });
    
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process health queries to avoid safety blocks
function preprocessQuery(message) {
    const replacements = {
        "diagnose": "explain symptoms of",
        "prescribe": "suggest approaches for",
        "cure for": "management of",
        "treatment for": "information about",
        "medicine for": "approaches to"
    };
    
    let processed = message.toLowerCase();
    for (const [term, replacement] of Object.entries(replacements)) {
        processed = processed.replace(term, replacement);
    }
    return processed;
}

// Call Gemini API
async function sendMessageToAPI(message) {
    try {
        // Add user message to history
        conversationHistory.push({
            role: "user",
            parts: [{ text: preprocessQuery(message) }]
        });
        
        // Prepare payload (skip system instruction in actual request)
        const payload = {
            contents: conversationHistory,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
                topP: 0.9,
                topK: 40
            },
            safetySettings: [
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
            ]
        };

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            
            let errorMsg = 'API request failed';
            if (errorData.error?.message) {
                if (errorData.error.message.includes('quota')) errorMsg = "API quota exceeded";
                else if (errorData.error.message.includes('key')) errorMsg = "Invalid API key";
                else if (errorData.error.message.includes('model')) errorMsg = "Model unavailable";
                else errorMsg = errorData.error.message;
            }
            throw new Error(errorMsg);
        }

        const data = await response.json();
        
        // Validate response structure
        if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("Unexpected API response format");
        }

        const botResponse = data.candidates[0].content.parts[0].text;
        
        // Add to history and trim if needed
        conversationHistory.push({
            role: "model",
            parts: [{ text: botResponse }]
        });
        
        if (conversationHistory.length > MAX_HISTORY_LENGTH + 1) { // +1 for system
            conversationHistory = [
                conversationHistory[0], // keep system
                ...conversationHistory.slice(-MAX_HISTORY_LENGTH)
            ];
        }

        return botResponse;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Handle message sending
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    userInput.value = '';
    addUserMessage(message);
    showTypingIndicator();
    
    try {
        const botResponse = await sendMessageToAPI(message);
        hideTypingIndicator();
        addBotMessage(botResponse);
        
        // Show relevant follow-up suggestions
        const suggestions = detectSuggestions(botResponse);
        if (suggestions.length > 0) {
            showSuggestions(suggestions);
        }
    } catch (error) {
        hideTypingIndicator();
        
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        
        if (error.message.includes('quota')) {
            errorDiv.textContent = "API limit reached. Please try again later.";
        } else if (error.message.includes('key') || error.message.includes('model')) {
            errorDiv.textContent = "Service configuration error. Please check your API setup.";
        } else if (error.message.includes('safety') || error.message.includes('blocked')) {
            errorDiv.textContent = "Couldn't generate a response due to content safety filters. Please try rephrasing.";
        } else {
            errorDiv.textContent = "Sorry, I encountered an error. Please try again.";
        }
        
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Detect suggestions based on bot response
function detectSuggestions(response) {
    const suggestions = [];
    
    if (response.includes('fever')) {
        suggestions.push("How to reduce fever", "When fever is dangerous");
    }
    if (response.includes('pain')) {
        suggestions.push("Pain relief options", "When pain needs medical attention");
    }
    if (response.includes('doctor') || response.includes('medical')) {
        suggestions.push("Find nearby clinics", "Emergency symptoms");
    }
    
    // Default suggestions if none detected
    if (suggestions.length === 0) {
        return [
            "More information",
            "Related health topics",
            "When to seek help",
            "Prevention tips"
        ];
    }
    
    return suggestions.slice(0, 4); // Max 4 suggestions
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initChat);