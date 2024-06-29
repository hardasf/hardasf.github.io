const API_URL = 'http://158.101.198.227:8268/api';

async function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const url_pic = document.getElementById('register-url-pic').value;
    const fb_link = document.getElementById('register-fb-link').value;

    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, url_pic, fb_link })
    });

    const data = await response.json();
    alert(data.message);
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('auth').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
    } else {
        alert(data.message);
    }
}

async function createRoom() {
    const name = document.getElementById('chatroom-name').value;
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/chat/createRoom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ name })
    });

    const data = await response.json();
    alert(data.message);
}

async function sendMessage() {
    const chatroom_id = 1; // Assume chatroom_id is 1 for simplicity
    const name = 'User'; // Use a static name or fetch the logged-in user's name
    const message = document.getElementById('message').value;
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/chat/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ chatroom_id, name, message })
    });

    const data = await response.json();
    alert(data.message);
    loadMessages();
}

async function loadMessages() {
    const chatroom_id = 1; // Assume chatroom_id is 1 for simplicity
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/chat/getMessages/${chatroom_id}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });

    const data = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';

    data.messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.timestamp}: ${msg.name} - ${msg.message}`;
        messagesDiv.appendChild(messageElement);
    });
}

// Load messages every 5 seconds
setInterval(loadMessages, 5000);