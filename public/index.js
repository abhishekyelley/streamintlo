
const moviePlayer = document.querySelector('#moviePlayer');
const moviePicker = document.querySelector('#moviePicker');

// fetch all available movies from /movieList
fetch('/movieList')
.then(response => 
    response.json()
)
.then(movieList => {
    // foe every id in object, make a new anchor tag
    for(const item in movieList){
        moviePicker.innerHTML += `<a class="movie-item" href="/player.html?id=${item}">${movieList[item].movieTitle}</a>`;
    }
})
.catch(error => 
    console.error(error)
)