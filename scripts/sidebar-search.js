document.addEventListener("DOMContentLoaded", function () {
	// Get search input, chat tiles, and sidebar element
	const searchInput = document.getElementById("search-input");
	const chatTiles = document.querySelectorAll(".chat-tile");
	const sidebar = document.getElementById("sidebar");

	// Create a container for search results
	const searchResultsContainer = document.createElement("div");
	searchResultsContainer.id = "search-results-container";
	searchResultsContainer.style.marginTop = "10px"; // Optional styling
	sidebar.appendChild(searchResultsContainer);

	// Function to handle search input and display matching chat tiles
	searchInput.addEventListener("input", function () {
		const query = searchInput.value.toLowerCase().trim();

		// Clear previous search results
		searchResultsContainer.innerHTML = "";

		if (query) {
			chatTiles.forEach((tile) => {
				const title = tile.querySelector(".chat-tile-title span").textContent.toLowerCase();
				const subtitle = tile.querySelector(".chat-tile-subtitle span").textContent.toLowerCase();

				// Check if the title or subtitle includes the search query
				if (title.includes(query) || subtitle.includes(query)) {
					// Clone the matched chat tile to display in the search results
					const resultTile = tile.cloneNode(true);
					resultTile.classList.add("search-result");

					// Event listener for resultTile to show full chat in main window
					resultTile.addEventListener("click", function () {
						const senderName = tile.querySelector(".chat-tile-title span").textContent;
						const messageContent = tile.querySelector(".chat-tile-subtitle span").textContent;

						// Update active chat details and chat message in the main chat window
						const activeChatDetails = document.getElementById("active-chat-details");
						activeChatDetails.textContent = senderName;

						const chatMessage = document.querySelector(".chat-message.chat-message-first");
						chatMessage.textContent = messageContent;
					});

					// Append each resultTile to the search results container
					searchResultsContainer.appendChild(resultTile);
				}
			});
		}
	});

	// Clear search results if input is cleared
	searchInput.addEventListener("blur", function () {
		if (searchInput.value === "") {
			searchResultsContainer.innerHTML = "";
		}
	});
});
