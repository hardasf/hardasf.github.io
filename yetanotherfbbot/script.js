// Preventing redirection
const iframe = document.getElementById('embedded-website');
iframe.addEventListener('load', function() {
  const currentUrl = iframe.contentWindow.location.href;
  if (currentUrl !== 'http://yetanotherfbbot.zya.me') { iframe.contentWindow.location.replace('http://yetanotherfbbot.zya.me'); 
  }
});


// Load the iframe and enable cookie access
const iframe = document.getElementById('embedded-website');
iframe.allow = "encrypted-media";

// Check if cookies are enabled
iframe.addEventListener('load', function() {
  const cookieEnabled = iframe.contentWindow.navigator.cookieEnabled;
  if (!cookieEnabled) {
    alert('Cookies are not enabled in your browser. Please enable cookies to use this website.');
  }
});