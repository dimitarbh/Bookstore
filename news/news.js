let sortByNewest = true;

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

toggleSort();
