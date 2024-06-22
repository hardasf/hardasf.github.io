 async function generateVideo() {
    const apiUrl = "https://shoti-srv1.onrender.com/api/v1/get";
    const apiKey = "$shoti-1ho3b41uiohngdbrgk8";

    try {
      const loadingOverlay = document.getElementById("loading-overlay");
      loadingOverlay.style.display = "flex";

      const { data } = await axios.post(apiUrl, { apikey: apiKey });

      if (data.code === 200) {
        const videoPlayer = document.getElementById("video-player");
        const videoInfoPopup = document.getElementById("video-info-popup");

        videoPlayer.src = data.data.url;
        videoPlayer.addEventListener("ended", generateVideo);

        const modal = document.getElementById("myModal");
        const closeButton = document.getElementsByClassName("close")[0];

        const showInfoButton = document.getElementById("show-info-btn");
        showInfoButton.onclick = function() {
          modal.style.display = "block";
          videoInfoPopup.innerHTML = `
            <b>${data.data.title}</b>
            <p><b>NickName:</b> ${data.data.user.nickname}</p>
            <p><b>Toktik:</b> <a href="https://tiktok.com/@${data.data.user.username}">tiktok.com/@${data.data.user.username}</a></p>
            <br>
            <br>
            <a
          href="https://www.facebook.com/rejardbentazarofficial"
          style="
            color: white;
            background-color: skyblue;
            border: 2px solid skyblue;
            border-radius: 3px;
          "
          >Contact Developer</a
        >
          `;
        }

        closeButton.onclick = function() {
          modal.style.display = "none";
        }

        window.onclick = function(event) {
          if (event.target === modal) {
            modal.style.display = "none";
          }
        }
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`Contact Rejardgwapo para mafix\n\nError Code:\n${error}`);
    } finally {
      const loadingOverlay = document.getElementById("loading-overlay");
      loadingOverlay.style.display = "none";
    }
  }

  window.onload = function() {
    generateVideo();

    const videoContainer = document.getElementById("video-container");
    let startY = 0;
    let endY = 0;

    videoContainer.addEventListener('touchstart', function(e) {
      startY = e.touches[0].clientY;
    }, { passive: true });

    videoContainer.addEventListener('touchend', function(e) {
      endY = e.changedTouches[0].clientY;
      if (startY > endY) {
        generateVideo(); // Swipe up, generate new video
        videoPlayer.style.animation = 'swipeAnimation 0.5s ease';
      }
    }, { passive: true });
  };
