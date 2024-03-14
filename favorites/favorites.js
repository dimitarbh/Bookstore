document.addEventListener("DOMContentLoaded", function() {
    function parseQueryParameters() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const bookData = {};
        for (const [key, value] of urlParams) {
            bookData[key] = value;
        }
        return bookData;
    }

    function addBookToFavorites(bookData) {
        const booksSection = document.getElementById('books-section');
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const bookImage = document.createElement('img');
        bookImage.classList.add('book-image');
        bookImage.src = bookData.image;
        bookImage.alt = 'Book Cover';
        bookDiv.appendChild(bookImage);
        delete bookData.image
        for (const key in bookData) {
            if (bookData.hasOwnProperty(key)) {
                const propertyDiv = document.createElement('div');
                propertyDiv.classList.add('book-property');
                const propertyValue = document.createElement('span');
                propertyValue.textContent = bookData[key];
                propertyDiv.appendChild(propertyValue);
                bookDiv.appendChild(propertyDiv);
            }
        }

        booksSection.appendChild(bookDiv);
    }

    const bookData = parseQueryParameters();
    if (Object.keys(bookData).length !== 0) {
        addBookToFavorites(bookData);
    }
});
