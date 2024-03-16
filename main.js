document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", function() {
        logout();
    });

    function logout() {
        localStorage.removeItem('token');
        window.location.reload();
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

    function redirectToCurrentBook(event) {
        const book = event.currentTarget.closest('.book');
        const title = book.querySelector('.title').textContent;
        const author = book.querySelector('.author').textContent;
        const description = book.querySelector('.description').textContent;
        const publisher = book.querySelector('.publisher').textContent;
        const price = book.querySelector('.price').textContent;
        const discountedPrice = book.querySelector('.discounted-price').textContent;
        const image = book.querySelector('.cover-image').src;
    
        const queryParams = new URLSearchParams({
            image,
            title,
            author,
            description,
            publisher,
            price,
            discountedPrice,
        });
    
        window.location.href = `currentBook/currentBook.html?${queryParams.toString()}`;
    }

    function addToFavorites(event) {
        const star = event.target;
        const book = star.closest('.book');
        const title = book.querySelector('.title').textContent;
        const author = book.querySelector('.author').textContent;
        const description = book.querySelector('.description').textContent;
        const publisher = book.querySelector('.publisher').textContent;
        const price = book.querySelector('.price').textContent;
        const discountedPrice = book.querySelector('.discounted-price').textContent;
        const image = book.querySelector('.cover-image').src; 
    
        const queryParams = new URLSearchParams({
            image,
            title,
            author,
            description,
            publisher,
            price,
            discountedPrice,
        });
    
        window.location.href = `favorites/favorites.html?${queryParams.toString()}`;
    }

    const source = `
        {{#each books}}
            <li class="book">
            <a class="star" href="#"><i class="fa-solid fa-star"></i></a>
            <div class='currentBook'>
                <img class="cover-image" src="{{image}}" alt="Book Cover">
                <h5 class="title">{{title}}</h5>
            </div>
                <p class="author">Author: {{author}}</p>
                <p class="description additional-info hide">Description: {{description}}</p>
                <p class="publisher additional-info hide">Publisher: {{publisher}}</p>
                <p class="price additional-info hide">Price: {{price}}</p>
                {{#if discountedPrice}}
                    <p class="discounted-price additional-info hide">Discounted Price: {{discountedPrice}}</p>
                {{/if}}
                <p class=" hide">Top Selling: {{#if topSelling}}Yes{{else}}No{{/if}}</p>
                <p class="created-at additional-info hide">Created At: {{formatDate createdAt}}</p>
                <div class="bottom-content">
                    <button class="buy-button">Buy</button>
                    <button id="read-more" class="toggle-btn">Read more</button>
                </div>
            </li>
        {{/each}}
    `;
    
    const template = Handlebars.compile(source);

    Handlebars.registerHelper('formatDate', function(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    });

    fetch('https://bookstorebe-production.up.railway.app/books')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const topsellersDiv = document.getElementById('topsellers');
            const topSellersData = data.filter(book => book.topSelling);
            topsellersDiv.innerHTML = template({ books: topSellersData });

            const booksDiv = document.getElementById('books');
            const allBookData = data.filter(book => !book.topSelling);
            booksDiv.innerHTML = template({ books: allBookData });

            topsellersDiv.addEventListener('click', toggleAdditionalInfo);
            booksDiv.addEventListener('click', toggleAdditionalInfo);

            topsellersDiv.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', addToFavorites);
            });
            booksDiv.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', addToFavorites);
            });
            topsellersDiv.querySelectorAll('.currentBook').forEach(currentBook => {
                currentBook.addEventListener('click', redirectToCurrentBook);
            });
            booksDiv.querySelectorAll('.currentBook').forEach(currentBook => {
                currentBook.addEventListener('click', redirectToCurrentBook);
            });
            
        })
        .catch(error => {
            console.error('There was a problem fetching the books:', error);
        });
});
