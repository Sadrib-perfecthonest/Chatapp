document.addEventListener('DOMContentLoaded', function () {
    let selectedMessage = null;
    let currentUser = null; // Tracks the currently selected user
    let selectChatMode = false; // Tracks if "Select Chat" mode is enabled

    const chatsList = document.getElementById('chats-list');
    const chatWindowContents = document.getElementById('chat-window-contents');
    const selectChatButton = document.querySelector('.button-select'); // The "Select Chat" button

    // Add click event listener to "Select Chat" button
    selectChatButton.addEventListener('click', function () {
        selectChatMode = !selectChatMode; // Toggle the mode
        
    });

    // Attach click event listeners to chat tiles
    chatsList.addEventListener('click', function (e) {
        const chatTile = e.target.closest('.chat-tile');
        if (chatTile) {
            // Update the current user based on the clicked tile
            const userTitle = chatTile.querySelector('.chat-tile-title span:first-child').innerText;
            if (currentUser !== userTitle) {
                currentUser = userTitle;
                selectedMessage = null; // Reset selected message
                console.log(`Switched to user: ${currentUser}`);
                loadChatMessagesForUser(currentUser); // Load messages for the selected user
            }
        }
    });

    // Function to load chat messages for the selected user
    function loadChatMessagesForUser(user) {
        chatWindowContents.innerHTML = ''; // Clear existing chat window contents

        // Simulated messages (replace with your dynamic data)
        const messages = {
            'Friends 🤗': [
                { sender: 'Kshitiz', text: 'Hey, how are you?', time: '7:22 am', date: '5/11/2024' },
                { sender: 'Kshitiz', text: 'Let’s meet this weekend!', time: '7:23 am', date: '5/11/2024' },
            ],
            'Family': [
                { sender: 'Papa', text: 'Dinner at 8?', time: '8:00 pm', date: '6/11/2024' },
                { sender: 'Papa', text: 'Don’t forget to bring the cake!', time: '8:05 pm', date: '6/11/2024' },
            ],
            'Amor 💖': [
                { sender: 'Amor', text: 'Good night, love!', time: '10:00 pm', date: '7/11/2024' },
                { sender: 'Amor', text: 'Can’t wait to see you.', time: '10:15 pm', date: '7/11/2024' },
            ],
            'John': [
                { sender: 'John', text: 'Reply in the group fast.', time: '9:00 am', date: '8/11/2024' },
                { sender: 'John', text: 'Are we meeting at 7?', time: '9:15 am', date: '8/11/2024' },
            ],
        };

        if (messages[user]) {
            let lastDate = null;
            messages[user].forEach((msg) => {
                // Add a datestamp if the date changes
                if (msg.date !== lastDate) {
                    const datestampContainer = document.createElement('div');
                    datestampContainer.classList.add('datestamp-container');
                    datestampContainer.innerHTML = `<span class="datestamp">${msg.date}</span>`;
                    chatWindowContents.appendChild(datestampContainer);
                    lastDate = msg.date;
                }

                // Create the message group
                const messageGroup = document.createElement('div');
                messageGroup.classList.add('chat-message-group');

                const avatar = document.createElement('img');
                avatar.src = 'https://picsum.photos/50'; // Replace with actual avatar
                avatar.alt = 'Avatar';
                avatar.classList.add('chat-message-avatar');

                const messagesContainer = document.createElement('div');
                messagesContainer.classList.add('chat-messages');

                const messageContainer = document.createElement('div');
                messageContainer.classList.add('chat-message-container');

                const message = document.createElement('div');
                message.classList.add('chat-message', 'chat-message-first');
                message.innerHTML = `
                    <div class="chat-message-sender">${msg.sender}</div>
                    ${msg.text}
                    <span class="chat-message-time">${msg.time}</span>
                `;

                messageContainer.appendChild(message);
                messagesContainer.appendChild(messageContainer);
                messageGroup.appendChild(avatar);
                messageGroup.appendChild(messagesContainer);
                chatWindowContents.appendChild(messageGroup);
            });
        }
    }

    // Event listener for chat message click (selection)
    chatWindowContents.addEventListener('click', function (e) {
        const message = e.target.closest('.chat-message');
        if (message && selectChatMode) {
            // Deselect previously selected message
            if (selectedMessage) {
                selectedMessage.classList.remove('selected');
            }

            // Select the clicked message
            selectedMessage = message;
            selectedMessage.classList.add('selected');
        }
    });

    // Event listener for "Delete" key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Delete' && selectedMessage && selectChatMode) {
            // Replace the selected message with a "Message Deleted" text
            selectedMessage.innerHTML = 'Message Deleted';
            selectedMessage.classList.add('message-deleted');
            console.log(`Message deleted for user: ${currentUser}`);
            selectedMessage = null; // Reset the selection
        }
    });
});
