document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event triggered");
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "../logIn/login.html";
    }
});