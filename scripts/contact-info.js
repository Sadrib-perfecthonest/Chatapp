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
        backgroundColor: "#fefefe",
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

    // Contact details (initial content, will be dynamically updated)
    const contactDetails = `
    <h2>Contact Info</h2>
    <div class="contact-details">
        <img src="" alt="User Picture" class="user-image" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 15px; object-fit: cover;">
        <p><strong>Name:</strong> <span class="user-name">John Doe</span></p>
        <p><strong>Bio:</strong> <span class="user-bio">A tech enthusiast who loves coding.</span> <button class="edit-bio"><i class="fa fa-pencil"></i> Edit</button></p>
        <p><strong>Hobby:</strong> <span class="user-hobby">Hiking and photography</span> <button class="edit-hobby"><i class="fa fa-pencil"></i> Edit</button></p>
    </div>
   
    <div class="edit-info" style="display:none;">
        <label for="edit-bio">Bio:</label>
        <textarea id="edit-bio" class="edit-bio" rows="4" cols="30" style="display:none;"></textarea><br>
        <label for="edit-hobby">Hobby:</label>
        <input type="text" id="edit-hobby" class="edit-hobby" style="display:none;" /><br>
        <button class="save-changes">Save Changes</button>
    </div>
    <div class="security-info">
        <h3>Security</h3>
        <p>Your messages are encrypted for your safety.</p>
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
                bio: tile.querySelector(".chat-tile-bio") ? tile.querySelector(".chat-tile-bio").textContent : "No bio available",
                hobby: tile.querySelector(".chat-tile-hobby") ? tile.querySelector(".chat-tile-hobby").textContent : "Not specified",
            };
        });
    });

    // Show modal when "Contact Info" button is clicked
    contactButton.addEventListener("click", () => {
        if (selectedUser) {
            // Update the modal with the selected user's info
            const userImageElement = contactModal.querySelector(".user-image");
            const userNameElement = contactModal.querySelector(".user-name");
            const userBioElement = contactModal.querySelector(".user-bio");
            const userHobbyElement = contactModal.querySelector(".user-hobby");

            userImageElement.src = selectedUser.image;
            userNameElement.textContent = selectedUser.name;
            userBioElement.textContent = selectedUser.bio;
            userHobbyElement.textContent = selectedUser.hobby;

            // Set the input fields with current user data
            document.querySelector("#edit-bio").value = selectedUser.bio;
            document.querySelector("#edit-hobby").value = selectedUser.hobby;

            // Display the modal
            contactModal.style.display = "flex";
        } else {
            alert("Please select a user first.");
        }
    });

    // Edit Bio Button
    const editBioButton = contactModal.querySelector(".edit-bio");
    editBioButton.addEventListener("click", () => {
        document.querySelector(".user-bio").style.display = "none";
        document.querySelector("#edit-bio").style.display = "block";
        document.querySelector("#edit-bio").focus();
        document.querySelector(".edit-info").style.display = "block";
    });

    // Edit Hobby Button
    const editHobbyButton = contactModal.querySelector(".edit-hobby");
    editHobbyButton.addEventListener("click", () => {
        document.querySelector(".user-hobby").style.display = "none";
        document.querySelector("#edit-hobby").style.display = "block";
        document.querySelector("#edit-hobby").focus();
        document.querySelector(".edit-info").style.display = "block";
    });

    // Save changes (edit bio and hobby) when "Save Changes" button is clicked
    const saveChangesButton = contactModal.querySelector(".save-changes");
    saveChangesButton.addEventListener("click", () => {
        const updatedBio = document.querySelector("#edit-bio").value;
        const updatedHobby = document.querySelector("#edit-hobby").value;

        // Update the modal content
        const userBioElement = contactModal.querySelector(".user-bio");
        const userHobbyElement = contactModal.querySelector(".user-hobby");

        userBioElement.textContent = updatedBio;
        userHobbyElement.textContent = updatedHobby;

        // Update the selected user info (you can save this information as needed)
        selectedUser.bio = updatedBio;
        selectedUser.hobby = updatedHobby;

        alert("Changes saved!");

        // Optionally, clear the input fields after saving
        document.querySelector("#edit-bio").value = "";
        document.querySelector("#edit-hobby").value = "";

        // Hide text areas and show updated text
        document.querySelector("#edit-bio").style.display = "none";
        document.querySelector("#edit-hobby").style.display = "none";
        document.querySelector(".user-bio").style.display = "block";
        document.querySelector(".user-hobby").style.display = "block";
        document.querySelector(".edit-info").style.display = "none";
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
