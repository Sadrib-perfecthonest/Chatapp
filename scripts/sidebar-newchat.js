// Create a popup container for adding a new user
// Popup container styling
let popupContainer = document.createElement('div');
popupContainer.classList.add('popup-container');
popupContainer.style.display = 'none';
popupContainer.style.position = 'fixed';
popupContainer.style.top = '50%';
popupContainer.style.left = '50%';
popupContainer.style.transform = 'translate(-50%, -50%)';
popupContainer.style.padding = '20px';
popupContainer.style.backgroundColor = 'white';
popupContainer.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
popupContainer.style.zIndex = '1000';
popupContainer.style.width = '300px';

// Close button for the popup
let closeButton = document.createElement('button');
closeButton.innerText = 'Close';
closeButton.onclick = () => {
  popupContainer.style.display = 'none';
};

// Input field for entering the user's name
let userNameInput = document.createElement('input');
userNameInput.type = 'text';
userNameInput.placeholder = 'Enter username';
userNameInput.style.marginBottom = '10px';
userNameInput.style.width = '100%';

// Add user button to add selected user to the sidebar and chat tile
let addUserButton = document.createElement('button');
addUserButton.innerText = 'Add User';
addUserButton.style.display = 'block';
addUserButton.style.marginTop = '10px';
addUserButton.onclick = () => {
  let username = userNameInput.value.trim();
  if (username) {
    let timestamp = getFormattedTimestamp();
    addUserToSidebar(username, timestamp);
    addUserToChatTile(username, timestamp);
    popupContainer.style.display = 'none';
    userNameInput.value = '';
  }
};

// Append elements to the popup container
popupContainer.appendChild(closeButton);
popupContainer.appendChild(userNameInput);
popupContainer.appendChild(addUserButton);
document.body.appendChild(popupContainer);

// Function to add user to sidebar
function addUserToSidebar(username, timestamp) {
  let sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    let userItem = document.createElement('div');
    userItem.classList.add('sidebar-user');
    userItem.style.display = 'flex';
    userItem.style.alignItems = 'center';
    userItem.style.padding = '10px';
    userItem.style.cursor = 'pointer';

    let avatar = document.createElement('img');
    avatar.src = 'path/to/avatar.png'; // Replace with actual avatar image path
    avatar.classList.add('avatar');
    avatar.style.width = '40px';
    avatar.style.height = '40px';
    avatar.style.borderRadius = '50%';
    avatar.style.marginRight = '10px';

    let content = document.createElement('div');
    let name = document.createElement('span');
    name.innerText = username;
    name.style.fontWeight = 'bold';
    name.style.display = 'block';
    name.style.fontSize = '16px'; // Added to match other users
    name.style.color = '#f0f0f0'; // Color to match the theme

    let subtitle = document.createElement('span');
    subtitle.innerText = 'Last message preview...'; // Placeholder for the last message
    subtitle.style.color = 'gray';
    subtitle.style.fontSize = '12px';
    subtitle.style.fontStyle = 'italic'; // Styled to match others

    let timestampSpan = document.createElement('span');
    timestampSpan.innerText = timestamp;
    timestampSpan.style.fontSize = '12px';
    timestampSpan.style.marginLeft = 'auto'; // Align timestamp to the right

    content.appendChild(name);
    content.appendChild(subtitle);
    userItem.appendChild(avatar);
    userItem.appendChild(content);
    userItem.appendChild(timestampSpan);

    // Click event to open chat window
    userItem.onclick = () => openChatWindow(username);

    sidebar.appendChild(userItem);
  } else {
    console.error("Sidebar element not found.");
  }
}

// Function to add user to chat tile list
function addUserToChatTile(username, timestamp) {
  let chatsList = document.getElementById('chats-list');
  if (chatsList) {
    let chatTile = document.createElement('div');
    chatTile.classList.add('chat-tile');
    chatTile.style.cursor = 'pointer';
    chatTile.style.padding = '10px';
    chatTile.style.display = 'flex';
    chatTile.style.alignItems = 'center';

    let avatar = document.createElement('img');
    avatar.src = 'path/to/avatar.png'; // Replace with actual avatar image path
    avatar.classList.add('avatar');
    avatar.style.width = '40px';
    avatar.style.height = '40px';
    avatar.style.borderRadius = '50%';
    avatar.style.marginRight = '10px';

    let content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';

    let name = document.createElement('span');
    name.innerText = username;
    name.style.fontWeight = 'bold';
    name.style.fontSize = '16px'; // Consistent font size
    name.style.color = '#f0f0f0'; // Consistent color with other titles

    let subtitle = document.createElement('span');
    subtitle.innerText = 'Last message preview...'; // Placeholder for the last message
    subtitle.style.color = 'gray';
    subtitle.style.fontSize = '12px';
    subtitle.style.fontStyle = 'italic'; // Consistent styling for subtitle

    let timestampSpan = document.createElement('span');
    timestampSpan.innerText = timestamp;
    timestampSpan.style.fontSize = '12px';
    timestampSpan.style.marginLeft = 'auto'; // Align timestamp to the right

    content.appendChild(name);
    content.appendChild(subtitle);
    chatTile.appendChild(avatar);
    chatTile.appendChild(content);
    chatTile.appendChild(timestampSpan);

    // Click event to open chat window
    chatTile.onclick = () => openChatWindow(username);

    chatsList.appendChild(chatTile);
  } else {
    console.error("#chats-list container not found.");
  }
}
// Function to open the chat window and update chat title and info
function openChatWindow(chatName) {
  // Fetch the chat header and check if it exists
  const chatHeader = document.getElementById("active-chat-details");

  // If chatHeader is null, exit the function to prevent errors
  if (!chatHeader) {
    console.error("chatHeader (active-chat-details) not found in the DOM.");
    return;
  }

  // Look for the title (h3) and info (div.info) elements inside the chat header
  const chatTitle = chatHeader.querySelector("h3");
  const chatInfo = chatHeader.querySelector(".info");

  // Check and set the innerText for chatTitle, if it exists
  if (chatTitle) {
    chatTitle.innerText = chatName;
  } else {
    console.error("chatTitle (h3 element) not found within active-chat-details.");
  }

  // Check and set the innerText for chatInfo, if it exists
  if (chatInfo) {
    chatInfo.innerText = "You and 60 others";  // Example info; replace with dynamic data if available
  } else {
    console.error("chatInfo (.info element) not found within active-chat-details.");
  }

  // Ensure the chat window is displayed by removing any 'hidden' class if it exists
  const chatWindow = document.getElementById("chat-window");
  if (chatWindow) {
    chatWindow.classList.remove("hidden");
  } else {
    console.error("chat-window not found in the DOM.");
  }
}

// Attach event listener to each chat tile
document.querySelectorAll('.chat-tile').forEach(chatTile => {
  chatTile.addEventListener('click', function() {
      const chatNameElement = chatTile.querySelector('.chat-tile-title span');
      const chatName = chatNameElement ? chatNameElement.innerText : null;

      if (chatName) {
        openChatWindow(chatName);
      } else {
        console.error("chatName not found in chat-tile-title span.");
      }
  });
});

// Handle the "New Chat" button click
// Function to open a chat window for the selected chat
function openChatWindow(chatName) {
  const chatHeader = document.getElementById("active-chat-details");

  // Clear existing content to avoid duplication
  chatHeader.innerHTML = "";

  // Create and append chat title
  const chatTitle = document.createElement("h3");
  chatTitle.innerText = chatName;
  chatHeader.appendChild(chatTitle);

  // Create and append chat info
  const chatInfo = document.createElement("div");
  chatInfo.classList.add("info");
  chatInfo.innerText = "You and 60 others"; // Update this dynamically if needed
  chatHeader.appendChild(chatInfo);

  // Show the chat window
  document.getElementById("chat-window").classList.remove("hidden");
}

// Event listener for each chat tile to open the respective chat
document.querySelectorAll(".chat-tile").forEach(chatTile => {
  chatTile.addEventListener("click", function () {
    const chatName = chatTile.querySelector(".chat-tile-title span").innerText;
    openChatWindow(chatName);
  });
});

// Attach event listener to the "New Chat" button to add new user chat tiles
const newChatButton = document.querySelector(".button-new-chat");

if (newChatButton) {
  newChatButton.addEventListener("click", function () {
    
    const chatNameInput = document.createElement("input");
    chatNameInput.type = "text";
    chatNameInput.placeholder = "Enter chat name";
    chatNameInput.classList.add("new-chat-input");

    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.classList.add("new-chat-submit");

    newChatForm.appendChild(chatNameInput);
    newChatForm.appendChild(submitButton);
    newChatButton.insertAdjacentElement("afterend", newChatForm);

    submitButton.addEventListener("click", function () {
      const chatName = chatNameInput.value.trim();

      if (chatName) {
        const newChatTile = document.createElement("div");
        newChatTile.classList.add("chat-tile");

        newChatTile.innerHTML = `
          <img src="https://picsum.photos/50" alt="" class="chat-tile-avatar">
          <div class="chat-tile-details">
            <div class="chat-tile-title">
              <span>${chatName}</span>
              <span>Now</span>
            </div>
            <div class="chat-tile-subtitle">
              <span>New chat started</span>
              <span class="chat-tile-menu">
                <img src="icons/pin.svg" alt="" class="pin">
              </span>
            </div>
          </div>
        `;

        document.getElementById("chats-list").appendChild(newChatTile);

        newChatTile.addEventListener("click", function () {
          openChatWindow(chatName);
        });

        chatNameInput.value = "";
        newChatForm.remove();
      } else {
        console.error("Please enter a chat name.");
      }
    });
  });
} else {
  console.error("New Chat button (.button-new-chat) not found in the DOM.");
}


// Function to send a message
function sendMessage(username, message) {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sender = "You"; // Assuming the sender is always "You" for the sake of this example

    // Check if the user exists in the chat data object, if not, create an empty array for them
    if (!chatData[username]) {
        chatData[username] = [];
    }

    // Add the new message to the user's chat history
    chatData[username].push({
        sender: sender,
        message: message,
        time: currentTime
    });

    // Now open the chat window to display the updated chat
    openChatWindow(username);
}


// Add event listeners to the sidebar chat tiles
document.querySelectorAll(".chat-tile").forEach(chatTile => {
    chatTile.addEventListener("click", function () {
        const username = chatTile.querySelector(".chat-tile-title span").innerText;
        openChatWindow(username);
    });
});


// Helper function to get a formatted timestamp
function getFormattedTimestamp() {
  const now = new Date();
  const options = { weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true };
  return now.toLocaleString('en-US', options);
}
