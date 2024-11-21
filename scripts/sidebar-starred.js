document.addEventListener('DOMContentLoaded', function () {
    let selectedMessage = null;
    const chatWindowContents = document.getElementById('chat-window-contents');
    const starredButton = document.querySelector('.button-Starred'); // Use the class for the button
    let starredMessages = new Set(); // Use a Set to store unique starred messages
    let showStarred = false; // Track whether to show starred messages or not

    // Event listener for selecting a message
    chatWindowContents.addEventListener('click', function (e) {
        const message = e.target.closest('.chat-message, .chat-message-first');
        if (message) {
            // Deselect the previously selected message
            if (selectedMessage) {
                selectedMessage.classList.remove('highlighted');
            }

            // Mark the clicked message as selected
            selectedMessage = message;
            selectedMessage.classList.add('highlighted');
        }
    });

    // Event listener for the Starred Messages button
    starredButton.addEventListener('click', function () {
        if (selectedMessage) {
            // Toggle star on the selected message
            if (selectedMessage.classList.contains('starred')) {
                // Remove star if already starred
                selectedMessage.classList.remove('starred');
                starredMessages.delete(selectedMessage);
            } else {
                // Add star if not already starred
                selectedMessage.classList.add('starred');
                starredMessages.add(selectedMessage);
            }
            selectedMessage.classList.remove('highlighted'); // Deselect after starring
            selectedMessage = null; // Reset selectedMessage
        }

        // Toggle view between all messages and only starred messages
        showStarred = !showStarred;
        toggleStarredMessages();
    });

    // Function to toggle visibility of messages
    function toggleStarredMessages() {
        const allMessages = chatWindowContents.querySelectorAll('.chat-message, .chat-message-first');
        allMessages.forEach(function (message) {
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
