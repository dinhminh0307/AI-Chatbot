// Existing event listeners for user input (no changes)
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

// Add user message to the chat body
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

// Add bot message to the chat body
function addBotMessage(message) {
    let chatBody = document.getElementById('chat-body');

    let botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('d-flex', 'flex-row', 'mb-3');

    // Ensure the bot image is the same across the interface
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

// Add product images to the chat body
function addProductImages() {
    let chatBody = document.getElementById('chat-body');

    // Create a container for the images
    let imageDiv = document.createElement('div');
    imageDiv.classList.add('image-container', 'mb-3');  // Add 'image-container' to align to the left

    // Create clickable image elements for KAGO, MB1, and MET2
    const products = [
        { name: 'KAGO', file: 'KAGO.png', url: '#kago' },
        { name: 'MB1', file: 'MB1.png', url: '#mb1' },
        { name: 'MET2', file: 'MET2.png', url: '#met2' }
    ];

    products.forEach(product => {
        let imgElement = document.createElement('img');
        imgElement.src = `assets/${product.file}`;
        imgElement.alt = product.name;
        imgElement.width = 100; // Adjust as necessary
        imgElement.height = 100; // Adjust as necessary
        imgElement.classList.add('rounded', 'product-image');

        // Add click event to open the image in focus (modal-like behavior)
        imgElement.addEventListener('click', function () {
            openImageInFocus(product.file, product.name);
        });

        imageDiv.appendChild(imgElement);
    });

    chatBody.appendChild(imageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;  // Scroll to the bottom of the chat
}



// Add station images to the chat body
function addStationImages() {
    let chatBody = document.getElementById('chat-body');

    let imageDiv = document.createElement('div');
    imageDiv.classList.add('image-container', 'mb-3');  // Add 'image-container' to align to the left

    // Create clickable image elements for station1, station2, and station3
    const stations = [
        { name: 'Station1', file: 'Inside.png', url: '#station1' },
        { name: 'Station2', file: 'Onside.png', url: '#station2' },
        { name: 'Station3', file: 'Outside.png', url: '#station3' }
    ];

    stations.forEach(station => {
        let imgElement = document.createElement('img');
        imgElement.src = `assets/${station.file}`;
        imgElement.alt = station.name;
        imgElement.width = 100; // Adjust as necessary
        imgElement.height = 100; // Adjust as necessary
        imgElement.classList.add('rounded', 'station-image');

        // Add click event to open the image in focus (modal-like behavior)
        imgElement.addEventListener('click', function () {
            openImageInFocus(station.file, station.name);
        });

        imageDiv.appendChild(imgElement);
    });

    chatBody.appendChild(imageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;  // Scroll to the bottom of the chat
}


// Function to open image in focus (modal-like behavior)
function openImageInFocus(imageFile, imageName) {
    // Create a modal div
    let modalDiv = document.createElement('div');
    modalDiv.id = 'image-modal';
    modalDiv.classList.add('image-modal');
    
    // Add the image and close button inside the modal
    modalDiv.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <img src="assets/${imageFile}" alt="${imageName}" class="focused-image">
        </div>
    `;

    // Append modal to body
    document.body.appendChild(modalDiv);

    // Close the modal when clicking the close button or outside the image
    modalDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('close-btn') || event.target === modalDiv) {
            modalDiv.remove();
        }
    });
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

// Function to handle user input and respond based on keywords
function handleUserInput(prompt) {
    addTypingIndicator();  // Show typing indicator
    
    // Define the keyword-response map
    const responses = {
        "product": "We offer various product lines: Electric bike, electric motorbikes, and electric KAGO. Detailed information on the products is below.",
        "metev": "MET is an innovative technology company with a focus on producing smart, safe, economical electric transportation.",
        "introduction": "MET EV produces smart electric vehicles powered by smart AI-driven battery management systems including battery charging and swapping options. We seek to build a comprehensive ecosystem integrating products, services, community engagement, and a lifestyle emphasizing environmental and social impact.",
        "battery": "METEV's standout feature is its 2-minute battery swapping system...",
        "engine": "Typically mounted in the hub or mid-drive position, it delivers smooth acceleration...",
        "station": "Met experience center focuses on bringing new experiences to customers. BOOK A TEST DRIVE AT HERE."
    };
    
    // Normalize user input
    const normalizedInput = prompt.toLowerCase().trim();
    
    // Find the response based on keywords
    let response = null;
    for (let keyword in responses) {
        if (normalizedInput.includes(keyword)) {
            response = responses[keyword];
            break;
        }
    }

    // If no matching response, fetch random text
    if (!response) {
        fetchRandomTextWithMETEV().then((randomText) => {
            removeTypingIndicator();  // Remove typing indicator once response is ready
            addBotMessage(randomText);  // Display the bot's response in the chat
        });
    } else {
        setTimeout(() => {
            removeTypingIndicator();  // Remove typing indicator once response is ready
            addBotMessage(response);  // Display the bot's response in the chat

            if (normalizedInput.includes("product")) {
                addProductImages();  // Display product images
            } else if (normalizedInput.includes("station")) {
                addStationImages();  // Display station images
            }
        }, 1000);
    }
}

// Fetch random text from an API and insert "METEV"
function fetchRandomTextWithMETEV() {
    return fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=2')
        .then(response => response.json())
        .then(data => {
            let randomText = data.join(' ');
            // Insert "METEV" every 5 words
            let words = randomText.split(' ');
            let interval = Math.floor(words.length / 5);
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

// Toggle between light and dark themes
const body = document.getElementById('body-theme');
const toggleButton = document.getElementById('toggle-theme-btn');
const toggleIcon = document.getElementById('toggle-icon');

function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        toggleIcon.classList.remove('bi-toggle-off');
        toggleIcon.classList.add('bi-toggle-on');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        toggleIcon.classList.remove('bi-toggle-on');
        toggleIcon.classList.add('bi-toggle-off');
    }
}

// Add event listener to the toggle button
toggleButton.addEventListener('click', toggleTheme);
