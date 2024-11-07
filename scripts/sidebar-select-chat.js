document.addEventListener('DOMContentLoaded', function() {
    let selectedMessage = null;
    const chatMessages = document.querySelectorAll('.chat-message, .chat-message-first');
    
    // Add event listener to each chat message
    chatMessages.forEach(function(message) {
        message.addEventListener('click', function() {
            // Deselect any previously selected message
            if (selectedMessage) {
                selectedMessage.classList.remove('selected');
            }

            // Mark the clicked message as selected
            selectedMessage = message;
            selectedMessage.classList.add('selected');
        });
    });

    // Listen for the "Delete" key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Delete' && selectedMessage) {
            // Replace the selected message with a "Message Deleted" text
            const messageContainer = selectedMessage.parentElement;
            const messageDeleted = document.createElement('div');
            messageDeleted.classList.add('message-deleted');
            messageDeleted.textContent = 'Message Deleted';
            messageContainer.innerHTML = ''; // Clear the existing message content
            messageContainer.appendChild(messageDeleted);

            selectedMessage = null; // Reset the selection
        }
    });
});

