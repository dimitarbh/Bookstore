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

    const source = `
        {{#each books}}
            <li class="book">
                <img class="cover-image" src="{{image}}" alt="Book Cover">
                <h5>{{title}}</h5>
                <p class="author">Author: {{author}}</p>
                <p class="description additional-info hide">Description: {{description}}</p>
                <p class="publisher additional-info hide">Publisher: {{publisher}}</p>
                <p class="price additional-info hide">Price: {{price}}</p>
                {{#if discountedPrice}}
                    <p class="discounted-price additional-info hide">Discounted Price: {{discountedPrice}}</p>
                {{/if}}
                <p class="top-selling additional-info hide">Top Selling: {{#if topSelling}}Yes{{else}}No{{/if}}</p>
                <p class="created-at additional-info hide">Created At: {{createdAt}}</p>
                <button class="toggle-btn">Read more</button>
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
            const booksDiv = document.getElementById('books');
            booksDiv.innerHTML = template({ books: data });

            booksDiv.addEventListener('click', toggleAdditionalInfo);
        })
        .catch(error => {
            console.error('There was a problem fetching the books:', error);
        });
});
