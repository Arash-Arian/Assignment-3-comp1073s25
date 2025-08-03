
const button = document.getElementById('fetchButton');
const table = document.getElementById('moviesTable');
const tbody=document.createElement('tbody');
table.appendChild(tbody);

// we create a function that when we press on the thead of the table it will sort the table by the column we clicked on
function sortTable(columnIndex) {
    const rows = Array.from(tbody.rows);
    // check if the table body has a data-sort-dir attribute to determine the current sort direction
    const isAscending = tbody.getAttribute('data-sort-dir') === 'asc';

    rows.sort((a, b) => {
        // get the text content of the cells in the specified column and compare them for sorting
        const cellA = a.cells[columnIndex].textContent.trim();
        const cellB = b.cells[columnIndex].textContent.trim();
        if (cellA < cellB) return isAscending ? -1 : 1;
        if (cellA > cellB) return isAscending ? 1 : -1;
        return 0;
    });

    // clear the existing rows and append sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));

    // toggle sort direction
    tbody.setAttribute('data-sort-dir', isAscending ? 'desc' : 'asc');
}
//add event listeners to the table headers for sorting
const headers = table.querySelectorAll('th');
headers.forEach((header, index) => {
    header.addEventListener('click', () => sortTable(index));
})

//we fetch starwars movies data from https://swapi.info/api/films and display it in a table format on the page
const apiUrl = 'https://swapi.info/api/films';
async function fetchMovies() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Movies data:', data[0]);
        displayMovies(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
function displayMovies(movies) {
    // clear existing rows in the table body
    tbody.innerHTML = '';
    movies.forEach(movie => {
        const row = tbody.insertRow();
        const titleCell = row.insertCell(0);
        const episodeCell = row.insertCell(1);
        const openingCrawlCell = row.insertCell(2);
        const directorCell = row.insertCell(3);
        const releaseDateCell = row.insertCell(4);

        titleCell.textContent = movie.title;
        episodeCell.textContent = movie.episode_id;
        openingCrawlCell.textContent = movie.opening_crawl;
        directorCell.textContent = movie.director;
        releaseDateCell.textContent = movie.release_date;
    });
}
// add event listener to the button to fetch movies when clicked
button.addEventListener('click', fetchMovies);