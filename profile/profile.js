document.addEventListener("DOMContentLoaded", function() {
    const profileNameElement = document.getElementById("profile-info-name");
    

    fetch('https://bookstorebe-production.up.railway.app/auth/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        profileNameElement.textContent = data.name;

    })
    .catch(error => {
        console.error('There was a problem fetching profile data:', error);
    });
});
