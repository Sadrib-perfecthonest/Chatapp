document.addEventListener("DOMContentLoaded", function () {
	// Get references to the search input, filter button, and chat tiles
	const searchInput = document.getElementById("search-input");
	const filterButton = document.querySelector(".button-filter");
	const chatTiles = Array.from(document.querySelectorAll(".chat-tile"));
	const sidebar = document.getElementById("sidebar");

	let filterUnread = false; // To toggle between unread and all messages

	// Filter function to show only unread messages
	function filterUnreadMessages() {
		chatTiles.forEach(tile => {
			const isUnread = tile.classList.contains("unread"); // Assuming "unread" class marks unread messages
			if (isUnread) {
				tile.style.display = "flex"; // Show unread messages
			} else {
				tile.style.display = "none"; // Hide read messages
			}
		});
	}

	// Function to show all messages
	function showAllMessages() {
		chatTiles.forEach(tile => {
			tile.style.display = "flex"; // Show all chat tiles
		});
	}

	// Toggle filter on button click
	filterButton.addEventListener("click", function () {
		filterUnread = !filterUnread;

		if (filterUnread) {
			filterUnreadMessages();
		} else {
			showAllMessages();
		}
	});
});
