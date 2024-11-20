async function generateVideo() {
  const apiUrl = "https://shoti.kenliejugarap.com/getvideo.php";
  const apiKey = "shoti-3673ed33bc8186f@b37aba4c425fa@36@e6f30c0863dae181779bad3ee08@6ae95834eb@c8d1ccdf1d21a@b5@b4dc41afe7d@b8063f202@19c1c3fbf7bf1cbb@b1cac4b2d71fabc6c1b760ac0769490baaf4e6@c50";

  try {
    const loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "flex";

    // API Request
    const { data } = await axios.post(apiUrl, { apikey: apiKey });

    if (data.status === true) {
      const videoPlayer = document.getElementById("video-player");
      const videoInfoPopup = document.getElementById("video-info-popup");

      // Update video player with the fetched video URL
      videoPlayer.src = data.videoDownloadLink;
      videoPlayer.addEventListener("ended", generateVideo);

      const modal = document.getElementById("myModal");
      const closeButton = document.getElementsByClassName("close")[0];

      // Set up "Show Info" button
      const showInfoButton = document.getElementById("show-info-btn");
      showInfoButton.onclick = function () {
        modal.style.display = "block";
        videoInfoPopup.innerHTML = `
          <b>${data.title}</b>
          <p><b>Toktik:</b> <a href="${data.tiktokUrl}">${data.tiktokUrl}</a></p>
          <p><b>Username:</b> ${data.username}</p>
          <br>
          <a
            href="https://www.facebook.com/leechshares"
            style="
              color: white;
              background-color: skyblue;
              border: 2px solid skyblue;
              border-radius: 3px;
            "
          >Contact Developer</a>
        `;
      };

      // Close button for modal
      closeButton.onclick = function () {
        modal.style.display = "none";
      };

      // Close modal if clicking outside of it
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      };
    } else {
      alert(`Error: ${data.response}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(`Contact your mama para mafix\n\nError Code:\n${error}`);
  } finally {
    const loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "none";
  }
}

window.onload = function () {
  generateVideo();

  const videoContainer = document.getElementById("video-container");
  let startY = 0;
  let endY = 0;

  videoContainer.addEventListener(
    "touchstart",
    function (e) {
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  videoContainer.addEventListener(
    "touchend",
    function (e) {
      endY = e.changedTouches[0].clientY;
      if (startY > endY) {
        generateVideo(); // Swipe up, generate new video
        videoPlayer.style.animation = "swipeAnimation 0.5s ease";
      }
    },
    { passive: true }
  );
};
