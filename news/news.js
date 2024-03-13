document.addEventListener("DOMContentLoaded", function() {
    let sortByNewest = true;
    const sortButton = document.getElementById('sortButton');
    sortButton.addEventListener('click', toggleSort);
    function toggleSort() {
        sortByNewest = !sortByNewest;
        sortSectionByDate();
    }

    function sortSectionByDate() {
        const sections = document.querySelectorAll('main section');
        const sectionsArray = Array.from(sections);

        sectionsArray.sort((a, b) => {
            const dateA = new Date(a.querySelector('.date').textContent.split(': ')[1]);
            const dateB = new Date(b.querySelector('.date').textContent.split(': ')[1]);

            return sortByNewest ? dateB - dateA : dateA - dateB;
        });

        const marginContainer = document.getElementById('margin-container');
        marginContainer.innerHTML = '';
        sectionsArray.forEach(section => marginContainer.appendChild(section));

        const sortButton = document.getElementById('sortButton');
        sortButton.textContent = sortByNewest ? 'Sort by Date (Oldest)' : 'Sort by Date (Newest)';
    }

    sortSectionByDate(); 



    const newsSection = document.getElementById('margin-container');
    newsSection.addEventListener('click', toggleAdditionalInfo);

    function toggleAdditionalInfo(event) {
        const target = event.target;
        if (target.classList.contains('toggle-btn')) {
            const news = target.closest('.news');
            const additionalInfo = news.querySelectorAll('.additional-info');
            additionalInfo.forEach(info => {
                info.classList.toggle('hide');
            });
            target.textContent = additionalInfo[0].classList.contains('hide') ? 'Read more' : 'Read less';
        }
    }
    
    const source = `
    {{#each news}}
        <section class="news">
            <img class="cover-image" src="{{Image}}" alt="News Cover">
            <h5 class="title">{{title}}</h5>
            <p class="description">Description: {{description}}</p>
            <p class="author additional-info hide">Author: {{author}}</p>
            <p class="published-at date additional-info hide">Published At: {{formatDate publishedAt}}</p>
            <p class="publisher additional-info hide">Publisher: {{publisher}}</p>            
            <div class="bottom-content">
                <button id="read-more" class="toggle-btn">Read more</button>
            </div>
        </section>
    {{/each}}`



    const template = Handlebars.compile(source);

    Handlebars.registerHelper('formatDate', function(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    });

    fetch('https://bookstorebe-production.up.railway.app/news')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const newsSection = document.getElementById('margin-container');
            newsSection.innerHTML = template({ news: data });

            newsSection.addEventListener('click', toggleAdditionalInfo);
        })
        .catch(error => {
            console.error('There was a problem fetching the news:', error);
        });
});
