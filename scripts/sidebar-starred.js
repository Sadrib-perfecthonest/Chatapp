document.addEventListener('DOMContentLoaded', function() {
    let selectedMessage = null;
    const chatMessages = document.querySelectorAll('.chat-message, .chat-message-first');
    const starredButton = document.querySelector('.button-Starred'); // Use the class for the button
    let starredMessages = []; // Store starred messages
    let showStarred = false; // Track whether to show starred messages or not

    // Event listener for selecting a message
    chatMessages.forEach(function(message) {
        message.addEventListener('click', function() {
            // Deselect the previously selected message
            if (selectedMessage) {
                selectedMessage.classList.remove('highlighted');
            }

            // Mark the clicked message as selected
            selectedMessage = message;
            selectedMessage.classList.add('highlighted');
        });
    });

    // Event listener for the Starred Messages button
    starredButton.addEventListener('click', function() {
        if (selectedMessage) {
            // Toggle star on the selected message
            if (selectedMessage.classList.contains('starred')) {
                // Remove star if already starred
                selectedMessage.classList.remove('starred');
                starredMessages = starredMessages.filter(function(msg) {
                    return msg !== selectedMessage;
                });
            } else {
                // Add star if not already starred
                selectedMessage.classList.add('starred');
                starredMessages.push(selectedMessage);
            }
            selectedMessage = null; // Deselect the message after starring
        }

        // Toggle view between all messages and only starred messages
        showStarred = !showStarred;
        toggleStarredMessages();
    });

    // Function to toggle visibility of messages
    function toggleStarredMessages() {
        chatMessages.forEach(function(message) {
            if (showStarred) {
                // Show only starred messages
                if (!message.classList.contains('starred')) {
                    message.style.display = 'none'; // Hide non-starred messages
                } else {
                    message.style.display = 'block'; // Show starred messages
                }
            } else {
                // Show all messages
                message.style.display = 'block';
            }
        });
    }
});
