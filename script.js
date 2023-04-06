const userID = "738748102311280681"; //put ur discord user id here.
const statusImage = document.getElementById("status-image");

async function fetchDiscordStatus() {
  try {
    const response = await axios.get(
      `https://api.lanyard.rest/v1/users/${userID}`
    );
    const { data } = response.data;
    const { discord_status, activities } = data;

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
        imagePath = "";
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
  } catch (error) {
    console.error("Unable to retrieve Discord status:", error);
  }
}

fetchDiscordStatus();
setInterval(fetchDiscordStatus, 1000); // Update status every 5 seconds
