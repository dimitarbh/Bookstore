document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "../login.html";
    }
});