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
        bookImage.classList.add('cover-image');
        bookImage.src = bookData.image;
        bookImage.alt = 'Book Cover';
        bookDiv.appendChild(bookImage);
    
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
    
        const title = document.createElement('h5');
        title.textContent = bookData.title;
        bookInfo.appendChild(title);
    
        const author = document.createElement('p');
        author.textContent = bookData.author;
        bookInfo.appendChild(author);
    
        const description = document.createElement('p');
        description.classList.add('additional-info');
        description.textContent = bookData.description;
        bookInfo.appendChild(description);
    
        const publisher = document.createElement('p');
        publisher.classList.add('additional-info');
        publisher.textContent = bookData.publisher;
        bookInfo.appendChild(publisher);
    
        const price = document.createElement('p');
        price.classList.add('additional-info');
        price.textContent = bookData.price;
        bookInfo.appendChild(price);
    
        if (bookData.discountedPrice) {
            const discountedPrice = document.createElement('p');
            discountedPrice.classList.add('additional-info');
            discountedPrice.textContent = bookData.discountedPrice;
            bookInfo.appendChild(discountedPrice);
        }
    
        bookDiv.appendChild(bookInfo);
    
        booksSection.appendChild(bookDiv);
    }
    

    const bookData = parseQueryParameters();
    if (Object.keys(bookData).length !== 0) {
        addBookToFavorites(bookData);
    }


});
