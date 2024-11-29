// Store chats dynamically (this simulates a database)
let chats = {
    "Friends 🤗": [
        { sender: "Kshitiz", message: "Hey there, how are you doing?", time: "7:22 am", avatar: "https://picsum.photos/id/103/50" },
        { sender: "Kshitiz", message: "Are you up to some fun this weekend?", time: "7:22 am", avatar: "https://picsum.photos/id/103/50" },
        { sender: "Kshitiz", message: "I'm thinking of going to the beach", time: "7:23 am", avatar: "https://picsum.photos/id/103/50" }
    ],
    "Family": [
        { sender: "Papa", message: "You gotta be kidding me", time: "10:34 pm", avatar: "https://picsum.photos/id/104/50" }
    ],
    "John": [
        { sender: "John", message: "Sure man", time: "7:30 am", avatar: "https://picsum.photos/id/106/50" },
        { sender: "John", message: "When are you free? Let's meet at the cafe first.", time: "7:30 am", avatar: "https://picsum.photos/id/106/50" }
    ],
    "Amor 💖": [
        { sender: "Amor", message: "You do not understand what I'm saying.", time: "7:50 pm", avatar: "https://picsum.photos/id/105/50" }
    ]
};

// Function to load chat messages with datestamp integration
function loadChatMessages(chatName) {
    const chatWindow = document.getElementById("chat-window-contents");
    chatWindow.innerHTML = ""; // Clear existing messages

    if (chats[chatName]) {
        let lastDate = null;

        chats[chatName].forEach(chat => {
            // Create a datestamp if the message date changes
            const messageDate = new Date().toLocaleDateString();
            if (lastDate !== messageDate) {
                const dateSeparator = document.createElement("div");
                dateSeparator.classList.add("chat-date-separator");
                dateSeparator.innerText = messageDate;
                chatWindow.appendChild(dateSeparator);
                lastDate = messageDate;
            }

            // Create message group
            const chatMessageGroup = document.createElement("div");
            chatMessageGroup.classList.add("chat-message-group");
            chatMessageGroup.innerHTML = `
                <img src="${chat.avatar}" alt="Avatar" class="chat-message-avatar">
                <div class="chat-messages">
                    <div class="chat-message">
                        <div class="chat-message-sender">${chat.sender}</div>
                        ${chat.message}
                        <span class="chat-message-time">${chat.time}</span>
                    </div>
                </div>
            `;
            chatWindow.appendChild(chatMessageGroup);
        });
    } else {
        chatWindow.innerHTML = "<p style='color: white;'>No messages in this chat.</p>";
    }
}
// Event listener for Delete Chat button
document.querySelector(".button-Delete-chat").addEventListener("click", () => {
    const activeChatDetails = document.getElementById("active-chat-details");
    const activeChatName = activeChatDetails.querySelector("h3").innerText.trim();

    // Delete the chat messages of the selected user
    if (chats[activeChatName]) {
        delete chats[activeChatName]; // Remove from memory
        loadChatMessages(activeChatName); // Reload chat window (now empty)
        alert(`Chat with ${activeChatName} has been deleted.`);
    } else {
        alert("No active chat to delete.");
    }
});

// Function to send a message (with current date integration)
function sendMessage() {
    const messageInput = document.getElementById("compose-chat-box");
    const messageText = messageInput.value.trim();
    const activeChatDetails = document.getElementById("active-chat-details");
    const activeChatName = activeChatDetails.querySelector("h3").innerText.trim();

    if (!messageText) {
        return;
    }

    // Add the message to the chats object
    if (!chats[activeChatName]) {
        chats[activeChatName] = []; // Initialize chat if it doesn't exist
    }

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentDateString = currentDate.toLocaleDateString();

    chats[activeChatName].push({
        sender: "You",
        message: messageText,
        time: currentTime,
        date: currentDateString,
        avatar: "https://picsum.photos/id/101/50" // Replace with your avatar
    });

    // Update the chat window
    loadChatMessages(activeChatName);

    // Update the subtitle in the sidebar
    const chatTiles = document.querySelectorAll("#chats-list .chat-tile");
    chatTiles.forEach(chatTile => {
        const chatName = chatTile.querySelector(".chat-tile-title span").innerText.trim();
        if (chatName === activeChatName) {
            const subtitle = chatTile.querySelector(".chat-tile-subtitle span");
            subtitle.innerText = `You: ${messageText}`; // Update subtitle with the latest message
        }
    });

    // Clear the input box
    messageInput.value = "";
}

// Optional: Styling for the datestamp (via JS)
const style = document.createElement("style");
style.innerText = `
    .chat-date-separator {
        text-align: center;
        font-size: 0.9em;
        color: gray;
        margin: 10px 0;
    }
    #chat-window-contents {
        padding: 10px;
    }
    .chat-message-group {
        margin-bottom: 15px;
    }
`;
document.head.appendChild(style);

// Event listener for the Send button
document.querySelector(".button-send").addEventListener("click", sendMessage);

// Optional: Allow Enter key to send messages
document.getElementById("compose-chat-box").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Function to create a new chat
document.querySelector(".button-new-chat").addEventListener("click", () => {
    const newUserName = prompt("Enter the name of the new chat:");
    if (!newUserName) return;

    // Check if the user already exists
    if (chats[newUserName]) {
        alert(`${newUserName} already exists.`);
        return;
    }

    // Assign a random avatar to the new user
    const randomAvatar = `https://picsum.photos/seed/${newUserName}/50`;

    // Add new user to the chats object
    chats[newUserName] = [];

    // Add new user to the sidebar
    const chatsList = document.getElementById("chats-list");
    const newChatTile = document.createElement("div");
    newChatTile.classList.add("chat-tile");
    newChatTile.innerHTML = `
        <img src="${randomAvatar}" alt="" class="chat-tile-avatar">
        <div class="chat-tile-details">
            <div class="chat-tile-title">
                <span>${newUserName}</span>
                <span>Now</span>
            </div>
            <div class="chat-tile-subtitle">
                <span>No messages yet</span>
            </div>
        </div>
    `;
    chatsList.appendChild(newChatTile);

    // Add event listener to dynamically created chat tile
    newChatTile.addEventListener("click", () => {
        const activeChatDetails = document.getElementById("active-chat-details");
        activeChatDetails.querySelector("h3").innerText = newUserName;

        // Load new user's empty chat messages
        loadChatMessages(newUserName);
    });

    alert(`New chat created for ${newUserName}.`);
});

// Simulate user switching chats
document.querySelectorAll(".chat-tile").forEach(chatTile => {
    chatTile.addEventListener("click", () => {
        const chatName = chatTile.querySelector(".chat-tile-title span").innerText.trim();
        const activeChatDetails = document.getElementById("active-chat-details");
        activeChatDetails.querySelector("h3").innerText = chatName;

        // Load selected user's chat messages
        loadChatMessages(chatName);
    });
});

// block part after block button clicks 
document.querySelector(".button-block").addEventListener("click", () => {
    const chatWindow = document.getElementById("chat-window-contents");
    const sidebar = document.getElementById("chats-list");

    const activeChatDetails = document.getElementById("active-chat-details");
    const activeChatName = activeChatDetails.querySelector("h3").innerText.trim();

    // Remove chat from the sidebar
    const chatTiles = sidebar.querySelectorAll(".chat-tile");
    chatTiles.forEach(chatTile => {
        const chatName = chatTile.querySelector(".chat-tile-title span").innerText.trim();
        if (chatName === activeChatName) {
            chatTile.remove();
        }
    });

    // Clear chat window content
    chatWindow.innerHTML = ""; 

    alert(`${activeChatName} has been blocked.`);
});
