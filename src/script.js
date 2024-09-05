document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let userInput = event.target.value;
        if (userInput.trim() !== "") {
            addUserMessage(userInput);
            sendPromptToServer(userInput);  // Send the user input to the server
            event.target.value = '';  // Clear input field
        }
    }
});

function addUserMessage(message) {
    let chatBody = document.getElementById('chat-body');

    let userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('d-flex', 'flex-row-reverse', 'mb-3');

    let avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar', 'bg-secondary', 'text-center', 'ml-2');
    avatarDiv.innerHTML = '<i class="fas fa-user text-white"></i>';

    let messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bg-primary', 'text-white', 'p-2', 'rounded');
    messageDiv.textContent = message;

    userMessageDiv.appendChild(messageDiv);
    userMessageDiv.appendChild(avatarDiv);

    chatBody.appendChild(userMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;  // Scroll to the bottom of the chat
}

function addBotMessage(message) {
    let chatBody = document.getElementById('chat-body');

    let botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('d-flex', 'flex-row', 'mb-3');

    let avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar', 'bg-primary', 'text-center', 'mr-2');
    avatarDiv.innerHTML = '<i class="fas fa-robot text-white"></i>';

    let messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bg-secondary', 'text-white', 'p-2', 'rounded');
    messageDiv.textContent = message;

    botMessageDiv.appendChild(avatarDiv);
    botMessageDiv.appendChild(messageDiv);

    chatBody.appendChild(botMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;  // Scroll to the bottom of the chat
}

function addTypingIndicator() {
    let chatBody = document.getElementById('chat-body');

    let typingDiv = document.createElement('div');
    typingDiv.setAttribute('id', 'typing-indicator');
    typingDiv.classList.add('d-flex', 'flex-row', 'mb-3');

    let avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar', 'bg-primary', 'text-center', 'mr-2');
    avatarDiv.innerHTML = '<i class="fas fa-robot text-white"></i>';

    let messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bg-light', 'text-muted', 'p-2', 'rounded');
    messageDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i> ChatBot is typing...';

    typingDiv.appendChild(avatarDiv);
    typingDiv.appendChild(messageDiv);

    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;  // Scroll to the bottom of the chat
}

function removeTypingIndicator() {
    let typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) {
        typingDiv.remove();
    }
}

function sendPromptToServer(prompt) {
    console.log(prompt);
    addTypingIndicator();  // Show typing indicator

    fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt, max_length: 100}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.generated_text);
        removeTypingIndicator();  // Remove typing indicator once the response is received
        addBotMessage(data.generated_text);  // Display the bot's response in the chat
    })
    .catch(error => {
        console.error('Error:', error);
        removeTypingIndicator();  // Remove typing indicator in case of an error
    });
}
