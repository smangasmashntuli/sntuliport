
let inactivityTimer;
let userName = '';
let awaitingName = false;

function clearChat() {
    document.getElementById('chatwithRob').innerHTML = '';
    document.getElementById('user-input').value = '';
}

function showTypingIndicator() {
    const chatBox = document.getElementById('chatwithRob');
    const typingIndicator = document.getElementById('typing-indicator');
    if (!typingIndicator) {
        const indicator = document.createElement('div');
        indicator.classList.add('message', 'bot');
        indicator.innerText = 'Rapid is typing...';
        indicator.setAttribute('id', 'typing-indicator');
        chatBox.appendChild(indicator);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('user', userInput);
        document.getElementById('user-input').value = '';
        resetInactivityTimer();

        showTypingIndicator();

        setTimeout(() => {
            hideTypingIndicator(); 

            if (awaitingName) {
                if (/^[a-zA-Z]+$/.test(userInput)) {
                    userName = userInput;
                    appendMessage('bot', `Thank you, ${userName}!`);
                    appendMessage('bot', 'How can I help you today? Please select one of the options below.');
                    displayOptions();
                    awaitingName = false;
                } else {
                    appendMessage('bot', 'Please enter a valid name (letters only).');
                }
            } else {
                if (!userName && userInput.toLowerCase() === 'hi') {
                    appendMessage('bot', 'Please enter your name:');
                    awaitingName = true;
                } else {
                    const botResponse = getBotResponse(userInput.toLowerCase());
                    appendMessage('bot', botResponse);
                }
            }
        }, 2000); 
    }
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chatwithRob');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const messageText = document.createElement('div');
    messageText.innerText = message;
    messageElement.appendChild(messageText);

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeSpan = document.createElement('div');
    timeSpan.classList.add('timestamp');
    timeSpan.style.fontSize = '0.8em';
    timeSpan.style.color = '#888';
    timeSpan.innerText = timestamp;
    messageElement.appendChild(timeSpan);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userInput) {
    const responses = {
        'what is heimlich maneuver?': 'The Heimlich maneuver is a first-aid technique used to treat choking caused by foreign objects obstructing the airway. It involves abdominal thrusts to dislodge the object.',
    'what should i do for a cut?': 'For minor cuts, clean the area with soap and water, apply an antibiotic ointment, and cover it with a bandage. For deep or heavily bleeding cuts, apply pressure and seek medical attention immediately.',
    'how do i treat a burn?': 'For burns, cool the area under running water for 10-15 minutes and cover it with a clean, non-stick bandage. Avoid applying ice, butter, or creams.',
    'thank you': 'You’re welcome! If you have any more questions, feel free to ask!',
    'help': 'I can provide information on first-aid techniques, health tips, and answers to your health-related questions!',
    'any advice for healthy eating?': 'Here are some tips for healthy eating:\n1. Eat a variety of colorful fruits and vegetables daily.\n2. Choose whole grains over refined grains.\n3. Include lean proteins like fish, poultry, beans, and legumes.\n4. Limit sugar, salt, and unhealthy fats.\n5. Stay hydrated by drinking plenty of water.',
    'how can I prevent cold and flu?': 'To prevent cold and flu:\n1. Wash your hands frequently with soap and water.\n2. Avoid touching your face, especially your eyes, nose, and mouth.\n3. Stay away from people who are sick.\n4. Maintain a balanced diet, exercise regularly, and get enough sleep.',
    'how should I handle allergies?': 'To manage allergies:\n1. Identify and avoid allergens.\n2. Use over-the-counter medications like antihistamines or nasal sprays (consult a doctor first).\n3. Keep your environment clean and free from dust or pet dander.\n4. Carry an epinephrine auto-injector for severe allergies.',
    'are there any ways to alleviate headaches?': 'To alleviate headaches:\n1. Stay hydrated and avoid dehydration.\n2. Rest in a quiet, dark room.\n3. Use over-the-counter pain relievers like ibuprofen or acetaminophen (as directed).\n4. Apply a cold or warm compress to your head or neck.',
    'how to deal with a situation where a person is about to give birth?': '1. Call emergency services immediately.\n2. Keep the mother calm and provide reassurance.\n3. Prepare a clean space with towels for the delivery.\n4. Encourage natural pushing during contractions.\n5. Catch the baby gently and keep both mother and baby warm.\n6. Do not cut the umbilical cord; wait for medical personnel to arrive.',
    'how can i stop a nosebleed?': 'To stop a nosebleed:\n1. Sit upright and lean forward slightly.\n2. Pinch the soft part of your nose for 5-10 minutes.\n3. Avoid lying down or tilting your head back.\n4. Seek medical help if the bleeding persists after 20 minutes.',
    'what should i do during a seizure?': '1. Stay calm and ensure the person is safe.\n2. Remove nearby objects that could cause injury.\n3. Do not restrain the person or put anything in their mouth.\n4. Turn them on their side to keep their airway clear.\n5. Call emergency services if the seizure lasts more than 5 minutes.',
    'how do i perform CPR?': '1. Check for responsiveness and breathing.\n2. Call emergency services.\n3. Begin chest compressions at a rate of 100-120 per minute, pressing 2 inches deep on the chest.\n4. Provide rescue breaths if trained (30 compressions followed by 2 breaths).',
    'how can i avoid dehydration?': 'To avoid dehydration:\n1. Drink plenty of water throughout the day.\n2. Consume water-rich foods like fruits and vegetables.\n3. Avoid excessive caffeine and alcohol.\n4. Drink extra fluids during exercise or in hot weather.',
    'what should i do for a sprain?': 'Follow the R.I.C.E. method:\n1. Rest the injured area.\n2. Ice it for 15-20 minutes every 1-2 hours.\n3. Compress with an elastic bandage to reduce swelling.\n4. Elevate the area above heart level.',
    'how to help someone having a heart attack?': '1. Call emergency services immediately.\n2. Keep the person calm and seated.\n3. Offer them aspirin (if not allergic) to chew.\n4. Perform CPR if they become unresponsive and are not breathing.',
    'how can i reduce stress?': 'To reduce stress:\n1. Practice deep breathing exercises or meditation.\n2. Engage in regular physical activity.\n3. Get adequate sleep.\n4. Talk to friends, family, or a counselor about your concerns.',
    'what are the symptoms of a stroke?': 'Remember F.A.S.T.:\nF: Face drooping on one side.\nA: Arm weakness or inability to lift.\nS: Speech difficulty or slurred speech.\nT: Time to call emergency services immediately.',
    'how to treat insect stings?': '1. Remove the stinger if visible.\n2. Wash the area with soap and water.\n3. Apply a cold compress to reduce swelling.\n4. Take an antihistamine for itching or swelling.'
    };

    return responses[userInput] || 'I’m sorry, I didn’t understand that. Try asking about first-aid topics.';
}

function displayOptions() {
    const options = ['Bleeding Control', 'Burn Treatment', 'Sprain Care', 'Close Chat', 'Other'];
    options.forEach(option => createButton(option));
}

function createButton(text) {
    const chatBox = document.getElementById('chatwithRob');
    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = text;
    button.addEventListener('click', handleButtonClick);
    chatBox.appendChild(button);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleButtonClick(event) {
        const message = event.target.textContent.trim();
        appendMessage('user', message);

        if (message.toLowerCase() === 'bleeding control') {
            appendMessage('bot', `For minor bleeding, follow these steps:\n1. Apply direct pressure to the wound.\n2. Elevate the area if possible.\n3. If the bleeding doesn't stop, seek medical assistance.`);
        } else if (message.toLowerCase() === 'burn treatment') {
            appendMessage('bot', `For minor burns, follow these steps:\n1. Cool the burn under running water for 10-15 minutes.\n2. Cover the burn with a clean, non-stick bandage.\n3. Take over-the-counter pain relief if needed.`);
        } else if (message.toLowerCase() === 'sprain/strain care') {
            appendMessage('bot', `For sprains and strains:\n1. Apply ice to reduce swelling.\n2. Rest the injured area.\n3. Compress with an elastic bandage.\n4. Elevate the injured area.`);
        } else if (message.toLowerCase() === 'choking relief') {
            appendMessage('bot', `To help someone who is choking:\n1. Ask the person to cough forcefully.\n2. If they cannot cough, perform abdominal thrusts (Heimlich maneuver).`);
        } else if (message.toLowerCase() === 'close chat') {
            document.getElementById('chatContainer').style.display = 'none';
            clearChat();
        }else if (message.toLowerCase() === 'other') {
            appendMessage('bot', `Can you please specify your problem. These are type of questions I can assist you with.\n1. What should i do for a cut?\n2. How do i treat a burn?\n3. Any advice for healthy eating?\n4. How can I prevent cold and flu?\n5. How should I handle allergies?\n6. Are there any ways to alleviate headaches?\nHow to deal with a situation where a person is about to give birth?`);
        } 
        else {
            appendMessage('bot', `Sorry, I didn’t understand that. Can you choose an option from the list?`);
        }
    }

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        const proceed = confirm("The chat is about to be closed!");
        if (proceed) {
            resetInactivityTimer();
        } else {
            clearChat();
        }
    }, 150000);
}

function closeChat() {
    document.getElementById('chatContainer').style.display = 'none';
    clearChat();
}


document.addEventListener('DOMContentLoaded', () => {
    appendMessage('bot', 'Hi, my name is Rapid. Enter "Hi" to get started.');
    resetInactivityTimer();
});