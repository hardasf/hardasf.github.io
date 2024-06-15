document.addEventListener("DOMContentLoaded", function() {
  let countdown = 5;
  const countdownDisplay = document.getElementById('countdown');
  
  const countdownInterval = setInterval(() => {
    countdown--;
    countdownDisplay.textContent = countdown;
    
    if (countdown === 0) {
      clearInterval(countdownInterval);
      window.location.href = "https://octobot.speedsnippet.xyz/";
    }
  }, 1000);
});
