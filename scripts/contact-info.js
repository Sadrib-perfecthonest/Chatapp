document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");

    const contactButton = document.querySelector(".button-contact");
    if (!contactButton) {
        console.error("Contact button not found. Check the selector or HTML structure.");
        return;
    }

    // Create modal container
    const contactModal = document.createElement("div");
    contactModal.id = "contact-modal";
    Object.assign(contactModal.style, {
        display: "none",
        position: "fixed",
        zIndex: "1000",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    });

    // Create modal content
    const modalContent = document.createElement("div");
    Object.assign(modalContent.style, {
        backgroundColor: " var(--primary)",
        borderRadius: "10px",
        padding: "20px",
        width: "50%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        position: "relative",
    });

    // Close button
    const closeButton = document.createElement("span");
    closeButton.textContent = "×";
    Object.assign(closeButton.style, {
        position: "absolute",
        top: "10px",
        right: "15px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#aaa",
        cursor: "pointer",
    });
    closeButton.addEventListener("mouseover", () => {
        closeButton.style.color = "#000";
    });
    closeButton.addEventListener("mouseout", () => {
        closeButton.style.color = "#aaa";
    });

    // Contact details (simplified content)
    const contactDetails = `
    <h2 style="color: white;">Contact Info</h2>
    <div class="contact-details">
        <img src="" alt="User Picture" class="user-image" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 15px; object-fit: cover;">
        <p style="color: white;"><strong>Username:</strong> <span class="user-name">John Doe</span></p>
        <p style="color: white;"><strong>Email:</strong> <span class="user-email">example@domain.com</span></p>
    </div>
    <div class="security-info">
        <h3 style="color: white;">Security</h3>
        <p style="color: white;">Your messages are encrypted for your safety.</p>
    </div>
    `;

    modalContent.innerHTML = contactDetails;
    modalContent.prepend(closeButton);

    // Append modal content to modal container
    contactModal.appendChild(modalContent);

    // Append modal to body
    document.body.appendChild(contactModal);

    // Variable to store selected user info
    let selectedUser = null;

    // Sidebar click event to update selected user
    const chatTiles = document.querySelectorAll(".chat-tile");
    chatTiles.forEach((tile) => {
        tile.addEventListener("click", () => {
            console.log("User selected:", tile);

            // Store the selected user info
            selectedUser = {
                image: tile.querySelector(".chat-tile-avatar").src,
                name: tile.querySelector(".chat-tile-title span").textContent,
                email: "placeholder@domain.com", // Placeholder for email until backend integration
            };
        });
    });

    // Show modal when "Contact Info" button is clicked
    contactButton.addEventListener("click", () => {
        if (selectedUser) {
            // Update the modal with the selected user's info
            const userImageElement = contactModal.querySelector(".user-image");
            const userNameElement = contactModal.querySelector(".user-name");
            const userEmailElement = contactModal.querySelector(".user-email");

            userImageElement.src = selectedUser.image;
            userNameElement.textContent = selectedUser.name;
            userEmailElement.textContent = selectedUser.email;

            // Display the modal
            contactModal.style.display = "flex";
        } else {
            alert("Please select a user first.");
        }
    });

    // Close modal when close button is clicked
    closeButton.addEventListener("click", () => {
        console.log("Close button clicked.");
        contactModal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === contactModal) {
            console.log("Outside modal clicked.");
            contactModal.style.display = "none";
        }
    });
});
