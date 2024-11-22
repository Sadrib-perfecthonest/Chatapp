document.addEventListener("DOMContentLoaded", function () {
    const fileButton = document.querySelector(".button-file");
    const chatWindowContents = document.getElementById("chat-window-contents");

    fileButton.addEventListener("click", function () {
        // Create an input element to allow file selection
        const fileInput = document.createElement("input");
        fileInput.type = "file"; // Accept all file types

        // Trigger the file input click event
        fileInput.click();

        fileInput.onchange = function () {
            const file = fileInput.files[0];
            if (file) {
                // Create a new message element for the uploaded file
                const messageElement = document.createElement("div");
                messageElement.className = "chat-message";
                messageElement.style.maxWidth = "max-content"; // Default to snug container

                // Create a URL for the uploaded file
                const fileURL = URL.createObjectURL(file);
                const fileType = file.type;

                // Create an appropriate HTML element for the file
                if (fileType.startsWith("image/")) {
                    messageElement.innerHTML = `
                        <div class="chat-message-sender">You</div>
                        <div style="display: inline-block; max-width: 320px;">
                            <img src="${fileURL}" alt="Uploaded Image" class="uploaded-file" style="max-width: 300px; height: auto; border-radius: 5px;">
                            <a href="${fileURL}" download="${file.name}" class="download-link" style="display: block; color: blue; text-decoration: none; margin-top: 5px;">
                                Download Image
                            </a>
                        </div>
                        <span class="chat-message-time">${new Date().toLocaleTimeString()}</span>
                    `;
                } else if (fileType.startsWith("video/")) {
                    messageElement.innerHTML = `
                        <div class="chat-message-sender">You</div>
                        <div style="display: inline-block; max-width: 320px;">
                            <video controls class="uploaded-file" style="max-width: 300px; height: auto; border-radius: 5px;">
                                <source src="${fileURL}" type="${file.type}">
                                Your browser does not support the video tag.
                            </video>
                            <a href="${fileURL}" download="${file.name}" class="download-link" style="display: block; color: blue; text-decoration: none; margin-top: 5px;">
                                Download Video
                            </a>
                        </div>
                        <span class="chat-message-time">${new Date().toLocaleTimeString()}</span>
                    `;
                } else {
                    // For other file types, display as a downloadable link
                    messageElement.innerHTML = `
                        <div class="chat-message-sender">You</div>
                        <div style="display: inline-block; max-width: 320px;">
                            <a href="${fileURL}" download="${file.name}" class="uploaded-file" target="_blank" style="text-decoration: none; color: blue;">
                                ${file.name}
                            </a>
                        </div>
                        <span class="chat-message-time">${new Date().toLocaleTimeString()}</span>
                    `;
                }

                // Append the message element to the chat window
                chatWindowContents.appendChild(messageElement);
                chatWindowContents.scrollTop = chatWindowContents.scrollHeight; // Scroll to the bottom
            }
        };
    });
});
