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


function addProductImages() {
    let chatBody = document.getElementById('chat-body');

    let imageDiv = document.createElement('div');
    imageDiv.classList.add('d-flex', 'justify-content-around', 'mb-3');

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
        imgElement.classList.add('rounded', 'product-image'); // 'product-image' for applying custom styles

        // Add click event to open the image in focus (modal-like behavior)
        imgElement.addEventListener('click', function () {
            openImageInFocus(product.file, product.name);
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

// Function to handle user input and respond locally based on keywords
function handleUserInput(prompt) {
    addTypingIndicator();  // Show typing indicator
    
    // Define the keyword-response map
    const responses = {
        "product": "We offer various product lines: Electric bike, electric motorbikes, and electric KAGO. Detailed information on the products is below.",
        "metev": "MET is an innovative technology company with a focus on producing smart, safe, economical electric transportation. Our strong electrical engineering, IOT and background coupled with our experience producing commercial drones allow us to innovate rapidly and effectively in the ever changing environment",
        "introduction": "MET EV produces smart electric vehicles powered by smart AI-driven battery management systems including battery charging and swapping options. We seek to build a comprehensive ecosystem integrating products, services, community engagement, and a lifestyle emphasizing environmental and social impact.",
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
            if (normalizedInput.includes("product")) {
                addProductImages();  // Display product images for product-related queries
            }
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

const body = document.getElementById('body-theme');
const toggleButton = document.getElementById('toggle-theme-btn');
const toggleIcon = document.getElementById('toggle-icon');

// Function to toggle between themes and switch the icon
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
