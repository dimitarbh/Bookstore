
document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../logIn/login.html";
    } else {
        const profileUsernameElement = document.querySelector("#profile-info-username");
        const profileEmailElement = document.querySelector("#profile-info-email");
        const editProfileDiv = document.querySelector("#edit-profile");
        const editUsernameInput = document.querySelector("#edit-username");
        const editEmailInput = document.querySelector("#edit-email");
        const editButton = document.querySelector("#edit-button");
        const saveButton = document.querySelector("#save-button");
        const profileImageElement = document.querySelector("#profile-image");
        const imageUploadInput = document.querySelector("#image-upload");
    
        editButton.addEventListener("click", function() {
            profileEmailElement.style.display = "none";
            profileUsernameElement.style.display = "none";
            editProfileDiv.style.display = "block";
            editUsernameInput.value = profileUsernameElement.textContent;
            editEmailInput.value = profileEmailElement.textContent;
            editButton.style.display = "none";
            saveButton.style.display = "inline-block";
        });
    
        saveButton.addEventListener("click", function() {
            profileUsernameElement.textContent = editUsernameInput.value;
            profileEmailElement.textContent = editEmailInput.value;
            
            profileUsernameElement.style.display = "block";
            profileEmailElement.style.display = "block";

            editProfileDiv.style.display = "none";
            saveButton.style.display = "none";
            editButton.style.display = "inline-block";
        });
    
        profileImageElement.addEventListener("click", function() {
            imageUploadInput.click();
        });
    
        imageUploadInput.addEventListener("change", function() {
            const file = imageUploadInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImageElement.src = e.target.result;
                    profileImageElement.classList.add("uploaded-image");
                };
                reader.readAsDataURL(file);
            }
        });
        
        
        fetch('https://bookstorebe-production.up.railway.app/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            profileEmailElement.textContent = data.email;
            profileUsernameElement.textContent = data.username
        })
        .catch(error => {
            console.error('There was a problem fetching profile data:', error);//kak на  всяка една страница в карт , профиле ако не съм лгона или имам ерор да ме върне към логин пейджа
        });
    }
});
