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
        bookImage.classList.add('cover-image'); 
        bookImage.src = bookData.image;
        bookImage.alt = 'Book Cover';
        bookDiv.appendChild(bookImage);

        const title = document.createElement('h5');
        title.textContent = bookData.title; 
        bookDiv.appendChild(title);

        const author = document.createElement('p');
        author.textContent = bookData.author; 
        bookDiv.appendChild(author);

        const description = document.createElement('p');
        description.classList.add('description', 'additional-info', 'hide'); 
        description.textContent = bookData.description;
        bookDiv.appendChild(description);

        const publisher = document.createElement('p');
        publisher.classList.add('publisher', 'additional-info', 'hide');
        publisher.textContent = bookData.publisher; 
        bookDiv.appendChild(publisher);

        const price = document.createElement('p');
        price.classList.add('price', 'additional-info', 'hide'); 
        price.textContent = bookData.price;
        bookDiv.appendChild(price);

        if (bookData.discountedPrice) {
            const discountedPrice = document.createElement('p');
            discountedPrice.classList.add('discounted-price', 'additional-info', 'hide'); 
            discountedPrice.textContent = bookData.discountedPrice; 
            bookDiv.appendChild(discountedPrice);
        }

        const readMoreButton = document.createElement('button');
        readMoreButton.classList.add('toggle-btn'); 
        readMoreButton.textContent = 'Read more';
        bookDiv.appendChild(readMoreButton);

        booksSection.appendChild(bookDiv);
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

    const bookData = parseQueryParameters();
    if (Object.keys(bookData).length !== 0) {
        addBookToFavorites(bookData);
    }

    document.getElementById('books-section').addEventListener('click', toggleAdditionalInfo);
});
