document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {}

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('https://bookstorebe-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(jsonData => {
        console.log('Log In successful:', jsonData);
    })
    .catch(error => {
        console.error('There was a problem with the log in:', error);
    });
});
