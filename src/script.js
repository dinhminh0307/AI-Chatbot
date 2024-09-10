document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let userInput = event.target.value;
        if (userInput.trim() !== "") {
            addUserMessage(userInput);
            handleUserInput(userInput);  // Handle the user input locally
            event.target.value = '';  // Clear input field
        }
    }
});

document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        addUserMessage(userInput);
        handleUserInput(userInput);  // Handle the user input locally
        document.getElementById('user-input').value = '';  // Clear input field
    }
});

function addUserMessage(message) {
    let chatBody = document.getElementById('chat-body');

    let userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('d-flex', 'flex-row-reverse', 'mb-3');

    // Replace avatar icon with user image
    let avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar', 'bg-secondary', 'text-center', 'ml-2');
    avatarDiv.innerHTML = '<img src="assets/user.jpg" alt="User Avatar" class="rounded-circle" width="40" height="40">';

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

    // Replace avatar icon with bot image (MetEv)
    let avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar', 'bg-primary', 'text-center', 'mr-2');
    avatarDiv.innerHTML = '<img src="assets/MetEv.jpg" alt="Bot Avatar" class="rounded-circle" width="40" height="40">';

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

    // Replace avatar icon with bot image (MetEv)
    let avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar', 'bg-primary', 'text-center', 'mr-2');
    avatarDiv.innerHTML = '<img src="assets/MetEv.jpg" alt="Bot Avatar" class="rounded-circle" width="40" height="40">';

    let messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bg-light', 'text-muted', 'p-2', 'rounded');
    messageDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i> METEV Bot is typing...';

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

// Function to handle user input and respond locally based on keywords
function handleUserInput(prompt) {
    addTypingIndicator();  // Show typing indicator
    
    // Define the keyword-response map
    const responses = {
        "product": "MetEV product is now in IOT application, Electric vehicle",
        "metev": "MET is an innovative technology company with a focus on producing smart, safe, economical electric transportation. Our strong electrical engineering, IOT and background coupled with our experience producing commercial drones allow us to innovate rapidly and effectively in the ever changing environment",
        "intro": "MET is an innovative technology company with a focus on producing smart, safe, economical electric transportation. Our strong electrical engineering, IOT and background coupled with our experience producing commercial drones allow us to innovate rapidly and effectively in the ever changing environment",
        "battery": "One of METEV's standout features is its 2-minute battery swapping system. This service allows electric vehicle users to replace depleted batteries at stations in under 2 minutes, providing an additional 100 kilometers of range. This innovation eliminates long wait times for charging, making EV use more convenient and accessible for daily commuters.",
        "engine": "Typically mounted in the hub or mid-drive position, it delivers smooth, silent acceleration and assists pedaling based on rider input. With power outputs ranging from 250W to 750W or more, it provides efficient energy conversion, extending riding range and enabling various speeds. The motor is controlled via a handlebar display or pedal sensor, offering different assist levels for versatile terrain adaptability." 
    };
    
    // Normalize the user input (convert to lowercase and trim whitespaces)
    const normalizedInput = prompt.toLowerCase().trim();
    
    // Find the matching response based on the keywords
    let response = null;
    for (let keyword in responses) {
        if (normalizedInput.includes(keyword)) {
            response = responses[keyword];
            break;
        }
    }

    // If no matching response found, fetch random text from API and inject METEV
    if (!response) {
        fetchRandomTextWithMETEV().then((randomText) => {
            removeTypingIndicator();  // Remove typing indicator once response is ready
            addBotMessage(randomText);  // Display the bot's response in the chat
        });
    } else {
        // Simulate a delay for the bot's response (to mimic processing time)
        setTimeout(() => {
            removeTypingIndicator();  // Remove typing indicator once response is ready
            addBotMessage(response);  // Display the bot's response in the chat
        }, 1000);
    }
}

// Fetch random text from an API and insert "METEV" randomly in the text
function fetchRandomTextWithMETEV() {
    return fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=2')
        .then(response => response.json())
        .then(data => {
            let randomText = data.join(' ');
            // Insert "METEV" randomly in the text
            let words = randomText.split(' ');
            let interval = Math.floor(words.length / 5); // Insert "METEV" every 5 words
            for (let i = interval; i < words.length; i += interval) {
                words[i] = "METEV " + words[i];
            }
            return words.join(' ');
        })
        .catch(error => {
            console.error('Error fetching random text:', error);
            return "METEV random text is unavailable at the moment.";
        });
}
