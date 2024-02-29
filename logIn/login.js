document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target)

    let data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    })
    
    fetch('https://bookstorebe-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Log In successful:', data);
    })
    .catch(error => {
        console.error('There was a problem with the log in:', error);
    });

})

