document.addEventListener('DOMContentLoaded', () => {
    const donateBanner = document.getElementById('donateBanner');
    const donateButton = document.getElementById('donateButton');
    const closeButton = document.getElementById('closeButton');
    let deferredPrompt;
    setTimeout(() => {
        donateBanner.style.display = 'block';
    }, 10000);
    donateButton.addEventListener('click', () => {
        window.location.href = 'https://facebook.com/OctobotRemake.Owner';
    });
    closeButton.addEventListener('click', () => {
        donateBanner.style.display = 'none';
    });
});
