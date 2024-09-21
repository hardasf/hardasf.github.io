// Replace this with your actual API URL
const apiUrl = 'https://raw.githubusercontent.com/hardasf/hardasf.github.io/refs/heads/main/ScrapeData/pinayflix.tv.json'; 

// Fallback image URL in case of invalid thumbnails
const fallbackThumbnail = 'https://via.placeholder.com/200x120.png?text=No+Thumbnail';

// Function to fetch data from the API
async function fetchVideoData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayVideos(data);
    } catch (error) {
        console.error('Error fetching video data:', error);
    }
}

// Function to dynamically display video cards
function displayVideos(videos) {
    const videoContainer = document.getElementById('video-container');
    
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');

        // Check if the thumbnail is a .gif or broken image, use fallback if needed
        const thumbnail = video.thumbnail.endsWith('.jpg') || video.thumbnail === '' 
            ? fallbackThumbnail 
            : video.thumbnail;

        videoCard.innerHTML = `
            <img style="width:100%" src="${thumbnail}" alt="${video.title}">
            <h3>${video.title}</h3>
            <button onclick="playVideo('${video.iframeSrc}')">Play</button>
        `;

        videoContainer.appendChild(videoCard);
    });
}

// Function to play the video in a modal
function playVideo(iframeSrc) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    
    iframe.src = iframeSrc;
    modal.style.display = 'flex';
}

// Function to close the video modal
document.getElementById('close-modal').onclick = function() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    
    iframe.src = ''; // Stop the video
    modal.style.display = 'none';
};

// Function to show the welcome popup
function showWelcomePopup() {
    const welcomePopup = document.getElementById('welcome-popup');
    welcomePopup.style.display = 'flex';
}

// Function to close the welcome popup
function closeWelcomePopup() {
    const welcomePopup = document.getElementById('welcome-popup');
    welcomePopup.style.display = 'none';
}

// Show welcome popup only on first visit
if (!localStorage.getItem('visited')) {
    showWelcomePopup();
    localStorage.setItem('visited', 'true');
}

// Fetch video data on page load
fetchVideoData();