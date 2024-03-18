document.addEventListener("DOMContentLoaded", function() {

    fetch('https://bookstorebe-production.up.railway.app/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch favorites: Server Error');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayFavoriteBooks(data);
        })
        .catch(error => {
            console.error('There was a problem fetching favorites:', error.message);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to fetch favorites. Please try again later.';
            const errorContainer = document.getElementById('error-container');
            if (errorContainer) {
                errorContainer.appendChild(errorMessage);
            } else {
                console.error('Error container not found in the DOM');
            }
        });

    function displayFavoriteBooks(books) {
        const booksSection = document.getElementById('books-section');
        booksSection.innerHTML = ''; 
        books.forEach(bookData => {
            const bookDiv = createBookElement(bookData);
            booksSection.appendChild(bookDiv);
        });
    }

    function createBookElement(bookData) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const bookImage = document.createElement('img');
        bookImage.classList.add('cover-image');
        bookImage.src = bookData.image;
        bookImage.alt = 'Book Cover';
        bookDiv.appendChild(bookImage);

        const bookInfoDiv = document.createElement('div');
        bookInfoDiv.classList.add('book-info');

        const title = document.createElement('h5');
        title.textContent = bookData.title;
        bookInfoDiv.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${bookData.author}`;
        bookInfoDiv.appendChild(author);


        bookDiv.appendChild(bookInfoDiv);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Favorites';
        removeButton.classList.add('remove-button');
        removeButton.dataset.bookId = bookData._id;
        removeButton.addEventListener('click', removeFromFavorites);
        bookDiv.appendChild(removeButton);

        return bookDiv;
    }

    function removeFromFavorites(event) {
        const bookId = event.target.dataset.bookId;
        fetch('https://bookstorebe-production.up.railway.app/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ bookId: bookId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove book from favorites');
            }
            return response.json();
        })
        .then(data => {
            console.log('Book removed from favorites:', data);
            event.target.closest('.book').remove(); 
        })
        .catch(error => {
            console.error('Error removing book from favorites:', error);
        });
    }

    function toggleAdditionalInfo(event) {
        const target = event.target;
        if (target.classList.contains('toggle-btn')) {
            const book = target.closest('.book');
            const additionalInfo = book.querySelectorAll('.additional-info');
            additionalInfo.forEach(info => {
                info.classList.toggle('hide');
            });
            target.textContent = additionalInfo[0].classList.contains('hide') ? 'Read more' : 'Read less';
        }
    }
    
    function parseQueryParameters() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const bookData = {};
        for (const [key, value] of urlParams) {
            bookData[key] = value;
        }
        return bookData;
    }

    const bookData = parseQueryParameters();
    if (Object.keys(bookData).length !== 0) {
        addBookToFavorites(bookData);
    }

    document.getElementById('books-section').addEventListener('click', toggleAdditionalInfo);
});
