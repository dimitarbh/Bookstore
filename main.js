document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", function() {
        logout();
    });

    function logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const source = `
        {{#each books}}
            <li class="book">
                <img class="cover-image" src="{{image}}" alt="Book Cover">
                <h5>{{title}}</h5>
                <p class="author">Author: {{author}}</p>
                <p class="description">Description: {{description}}</p>
                <p class="publisher">Publisher: {{publisher}}</p>
                <p class="price">Price: {{price}}</p>
                {{#if discountedPrice}}
                    <p class="discounted-price">Discounted Price: {{discountedPrice}}</p>
                {{/if}}
                <p class="top-selling">Top Selling: {{#if topSelling}}Yes{{else}}No{{/if}}</p>
                <p class="created-at">Created At: {{createdAt}}</p>
            </li>
        {{/each}}
    `;

    const template = Handlebars.compile(source);

    fetch('https://bookstorebe-production.up.railway.app/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const topSellers = data.filter(book => book.topSelling);
            const topSellersDiv = document.getElementById('topsellers');
            topSellersDiv.innerHTML = template({ books: topSellers });
            const booksDiv = document.getElementById('books');
            booksDiv.innerHTML = template({ books: data });
        })
        .catch(error => {
            console.error('There was a problem fetching the books:', error);
        });
});

