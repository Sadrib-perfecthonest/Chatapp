// Function to handle file upload
document.addEventListener("DOMContentLoaded", function () {
    const fileButton = document.querySelector(".button-file");
    const chatWindowContents = document.getElementById("chat-window-contents");
    
    fileButton.addEventListener("click", function () {
        // Create an input element to allow file selection
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*,video/*"; // Accept image and video files

        // Trigger the file input click event
        fileInput.click();

        fileInput.onchange = function () {
            const file = fileInput.files[0];
            if (file) {
                // Create a new message element for the uploaded file
                const messageElement = document.createElement("div");
                messageElement.className = "chat-message";

                // Create a URL for the uploaded file
                const fileURL = URL.createObjectURL(file);
                const fileType = file.type.startsWith("image/") ? "image" : "video";
                
                // Create an appropriate HTML element for the file
                if (fileType === "image") {
                    messageElement.innerHTML = `
                        <div class="chat-message-sender">You</div>
                        <img src="${fileURL}" alt="Uploaded Image" class="uploaded-file" style="max-width: 1000px; height: auto;">
                        <span class="chat-message-time">${new Date().toLocaleTimeString()}</span>
                    `;
                } else if (fileType === "video") {
                    messageElement.innerHTML = `
                        <div class="chat-message-sender">You</div>
                        <video controls class="uploaded-file" style="max-width: 100%; height: auto;">
                            <source src="${fileURL}" type="${file.type}">
                            Your browser does not support the video tag.
                        </video>
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
