const { Token } = require("@mui/icons-material");

document.addEventListener("DOMContentLoaded", function() {
    const profileNameElement = document.querySelector("#profile-info-name");
    const profileDescriptionElement = document.querySelector("#profile-info-description");
    const editProfileDiv = document.querySelector("#edit-profile");
    const editNameInput = document.querySelector("#edit-name");
    const editDescriptionInput = document.querySelector("#edit-description");
    const editButton = document.querySelector("#edit-button");
    const saveButton = document.querySelector("#save-button");
    const profileImageElement = document.querySelector("#profile-image");
    const imageUploadInput = document.querySelector("#image-upload");
    const token = localStorage.getItem("token");

    editButton.addEventListener("click", function() {
        profileNameElement.style.display = "none";
        profileDescriptionElement.style.display = "none";
        editProfileDiv.style.display = "block";
        editNameInput.value = profileNameElement.textContent;
        editDescriptionInput.value = profileDescriptionElement.textContent;
        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
    });

    saveButton.addEventListener("click", function() {
        profileNameElement.textContent = editNameInput.value;
        profileDescriptionElement.textContent = editDescriptionInput.value;

        profileNameElement.style.display = "block";
        profileDescriptionElement.style.display = "block";
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
        profileNameElement.textContent = data.name;
        profileDescriptionElement.textContent = data.description;
    })
    .catch(error => {
        console.error('There was a problem fetching profile data:', error);
    });
});
