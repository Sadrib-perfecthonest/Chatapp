// chat.js

// Function to send the message
function sendMessage() {
    // Get the input box and chat window contents
    const messageInput = document.getElementById('compose-chat-box');
    const chatWindowContents = document.getElementById('chat-window-contents');

    // Get the message value
    const message = messageInput.value.trim();

    // Check if the message is not empty
    if (message) {
        // Create a new message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message-group');

        // Optionally, add your avatar or sender's name
        messageElement.innerHTML = `
            <img src="https://picsum.photos/50" alt="" class="chat-message-avatar">
            <div class="chat-messages">
                <div class="chat-message-container">
                    <div class="chat-message chat-message-first">
                        <div class="chat-message-sender">You</div>
                        ${message}
                        <span class="chat-message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                </div>
            </div>
        `;

        // Append the new message to the chat window contents
        chatWindowContents.appendChild(messageElement);

        // Clear the input box
        messageInput.value = '';
        
        // Scroll to the bottom of the chat
        chatWindowContents.scrollTop = chatWindowContents.scrollHeight;
    }
}

// Attach the function to the send button
document.querySelector('.button-send').onclick = sendMessage;
