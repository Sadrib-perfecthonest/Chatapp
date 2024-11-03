document.addEventListener('DOMContentLoaded', function () {
    const emojiButton = document.querySelector('.button-emoji');
    const emojiContainer = document.createElement('div');
    
    emojiContainer.className = 'emoji-container hidden'; // Create a hidden container for emojis
    emojiContainer.innerHTML = `
        <span class="emoji">😀</span>
        <span class="emoji">😁</span>
        <span class="emoji">😂</span>
        <span class="emoji">😃</span>
        <span class="emoji">😄</span>
        <span class="emoji">😅</span>
        <span class="emoji">😆</span>
        <span class="emoji">😉</span>
        <span class="emoji">😊</span>
        <span class="emoji">😋</span>
        <span class="emoji">😎</span>
    `; // Add more emojis as needed

    document.getElementById('chat-window-footer').appendChild(emojiContainer); // Append to footer

    emojiButton.addEventListener('click', function () {
        emojiContainer.classList.toggle('hidden'); // Toggle visibility of emoji container
    });

    emojiContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('emoji')) {
            const messageBox = document.getElementById('compose-chat-box');
            messageBox.value += event.target.innerText; // Add emoji to message box
            emojiContainer.classList.add('hidden'); // Hide the emoji container after selection
        }
    });
});
