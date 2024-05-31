const emojis = [
    'https://twemoji.maxcdn.com/v/latest/72x72/1f60a.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f60b.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f60c.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f60d.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f60e.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f60f.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f61a.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f61b.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f61c.png', 
    'https://twemoji.maxcdn.com/v/latest/72x72/1f61d.png'  
];

async function fetchActiveSessions() {
    try {
        const response = await fetch('http://de1.bot-hosting.net:21850/api/active-sessions');
        const data = await response.json();
        const activeSessionsDiv = document.getElementById('activeSessions');
        activeSessionsDiv.innerHTML = '<h3>Active Sessions</h3>';
        if (data.success) {
            data.sessions.forEach(session => {
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                activeSessionsDiv.innerHTML += `
                    <div class="active-session">
                        <img src="${emoji}" alt="Profile Picture">
                        <p>Admin: <a href='https://fb.com/${session.admin_uid}'>Show Admin</a>, Prefix: ${session.prefix}, AppState Name: ${session.appStateName}</p>
                    </div>
                `;
            });
        } else {
            activeSessionsDiv.innerHTML += '<p>No active sessions found.</p>';
        }
    } catch (error) {
        console.error('Error fetching active sessions:', error);
    }
}

async function fetchLogs() {
    try {
        const response = await fetch('http://de1.bot-hosting.net:21850/api/logs');
        const data = await response.json();
        const logsDiv = document.getElementById('logs');
        logsDiv.innerHTML = '<h3>Logs</h3>';
        if (data.success) {
            data.logs.forEach(log => {
                logsDiv.innerHTML += `<p>${log}</p>`;
            });
        } else {
            logsDiv.innerHTML += '<p>No logs found.</p>';
        }
    } catch (error) {
        console.error('Error fetching logs:', error);
    }
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        const appState = JSON.parse(document.getElementById('appState').value);
        const admin_uid = document.getElementById('admin_uid').value;
        const prefix = document.getElementById('prefix').value;

        const response = await fetch('http://de1.bot-hosting.net:21850/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ appState, admin_uid, prefix })
        });

        const data = await response.json();

        if (data.success) {
            fetchActiveSessions();
            fetchLogs();
            Swal.fire('Success', data.message, 'success');
        } else {
            Swal.fire('Error', data.message, 'error');
        }
    } catch (error) {
        console.error('Error during login:', error);
        Swal.fire('Error', 'An error occurred during login.', 'error');
    }
});

setInterval(fetchLogs, 5000);

window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    setTimeout(() => {
        splash.style.display = 'none';
    }, 3000);
    fetchActiveSessions();
});