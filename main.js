document.addEventListener("DOMContentLoaded", function() {
    fetch('https://bookstorebe-production.up.railway.app/auth/books')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const books = data;

        const booksDiv = document.getElementById('books');

        booksDiv.innerHTML = '';

        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `<h5>${book.title}</h5>`;
            booksDiv.appendChild(bookDiv);
        });
    })
    .catch(error => {
        console.error('There was a problem fetching the books:', error);
    });
});
