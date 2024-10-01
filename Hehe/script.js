const galleryImages = document.querySelectorAll('.gallery-img');
const fullscreen = document.getElementById('fullscreen');
const fullscreenImg = document.getElementById('fullscreen-img');

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        fullscreenImg.src = image.src;
        fullscreen.style.display = 'flex';
    });
});

fullscreen.addEventListener('click', () => {
    fullscreen.style.display = 'none';
});

// Zoom functionality using pinch gestures
let scale = 1;
let lastTouchDist = 0;

fullscreenImg.addEventListener('touchmove', (event) => {
    if (event.touches.length === 2) {
        let touch1 = event.touches[0];
        let touch2 = event.touches[1];

        let dist = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);

        if (lastTouchDist) {
            let scaleDiff = dist - lastTouchDist;
            scale += scaleDiff * 0.005;
            if (scale < 1) scale = 1;
            fullscreenImg.style.transform = `scale(${scale})`;
        }
        lastTouchDist = dist;
    }
});

fullscreenImg.addEventListener('touchend', () => {
    lastTouchDist = 0;
});