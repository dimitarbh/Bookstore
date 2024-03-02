document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target)

    let data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    })
    
    fetch('https://bookstorebe-production.up.railway.app/auth/register', {
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
        console.log('Registration successful:', data);
        window.location.href = "../profile/profile.html"
    })
    .catch(error => {
        console.error('There was a problem with the registration:', error);
    });

})

