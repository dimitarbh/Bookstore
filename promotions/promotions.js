document.addEventListener("DOMContentLoaded", function() {
    function toggleAdditionalInfo(event) {
        const target = event.target;
        const book = target.closest('.book');
        if (target.classList.contains('toggle-btn')) {
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
                <h5 class="title">{{title}}</h5>
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
            const discountedData = data.filter(book => book.discountedPrice);
            const discountedDiv = document.getElementById('books')
            discountedDiv.innerHTML = template({ books: discountedData });
        

            discountedDiv.addEventListener('click', toggleAdditionalInfo)
        })
        .catch(error => {
            console.error('There was a problem fetching the books:', error);
        });
});
