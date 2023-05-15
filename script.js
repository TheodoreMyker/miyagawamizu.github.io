const userID = "738748102311280681"; //put ur discord user id here. // 738748102311280681
const statusImage = document.getElementById("status-image");
const avatarImage = document.getElementById("avatar-image");

async function fetchDiscordStatus() {
	try {
		const response = await axios.get(
			`https://api.lanyard.rest/v1/users/${userID}`
		);
		const { data } = response.data;
		const { discord_status, activities, discord_user } = data;

		// Get the corresponding image path for the status.
		let imagePath;
		switch (discord_status) {
			case "online":
				imagePath = "/public/status/online.svg";
				break;
			case "idle":
				imagePath = "/public/status/idle.svg";
				break;
			case "dnd":
				imagePath = "/public/status/dnd.svg";
				break;
			case "offline":
				imagePath = "/public/status/offline.svg";
				break;
			default:
				imagePath =
					"https://cdn.discordapp.com/attachments/1000271433777299588/1100167168273956904/output-onlinepngtools.png";
				break;
		}

		// Check the active status to update the image path.
		if (
			activities.find(
				(activity) => activity.type === 1 && activity.url.includes("twitch.tv")
			)
		) {
			imagePath = "/public/status/streaming.svg";
		}

		// Update the image.
		statusImage.src = imagePath;
		statusImage.alt = `Discord status: ${discord_status}`;
		avatarImage.src = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}`;
		avatarImage.alt = `Discord avatar: ${discord_user.username}`;

		// Check if avatar is a GIF
		if (avatarImage.src.endsWith(".gif")) {
			avatarImage.src += "?format=png&size=1024";
		}
	} catch (error) {
		console.error("Unable to retrieve Discord status:", error);
	}
}

// can't inspect element
document.addEventListener("keydown", function (e) {
	if (e.keyCode == 123) {
		e.preventDefault();
	}
});

document.addEventListener("contextmenu", function (e) {
	e.preventDefault();
});

fetchDiscordStatus();
setInterval(fetchDiscordStatus, 5000); // Update status every 5 seconds
