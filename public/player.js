const moviePlayer = document.querySelector('#moviePlayer');
const movieSource = document.querySelector('#movieSource');
const docTitle = document.querySelector('title');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('id');

// redirects to '/items/${relative path}'
movieSource.src = `/play?id=${movieId}`;
// loads the video element with the new source provided
// if source doesn't exists, 404 video plays
moviePlayer.load();

// i dont like having to make a fetch request again for metadata
// couldnt think of another way
fetch('/movieList')
    .then((response) =>
        response.json()
    )
    .then((movieList) => {
        if (movieList[movieId]) {
            movieName.innerHTML = `<a href="/" style="text-decoration:none;">🏠</a>  ` + movieList[movieId].movieTitle;
            docTitle.textContent = movieList[movieId].movieTitle;
            // subtitles are provided as a list of sources, check movieList.json, ted
            if (movieList[movieId].subtitles) {
                // every subtitles file will be added as a track
                // (thats how we get multiple subtitles)
                movieList[movieId].subtitles.forEach(item => {
                    const track = document.createElement('track');
                    track.src = '/items/' + item;
                    track.kind = 'subtitles';
                    track.label = 'english';
                    moviePlayer.appendChild(track);
                });
            }
        }
        else {
            throw "no movie";
        }
    })
    .catch((error) => {
        console.log(error);
        // if no video found, this will return the 404 video
        moviePlayer.src = `/items`;
    });