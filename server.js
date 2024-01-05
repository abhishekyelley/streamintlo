const express = require('express');
const fs = require('fs');
const path = require('path');
// const url = require('url');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Incase provided id has no video
const defaultVideoPath = '/assets/default.mp4';

const movieList = JSON.parse(fs.readFileSync('./movieList.json'));

// All the movie files from the below folder are hosted
// They can be accessed from route `/items/${relateive file path from the folder}`
const moviesPath = './assets';
// console.log(fs.readdirSync(moviesPath));

app.use(cors());
app.use('/', express.static('./public'));

// all the movies are hosted here
app.use('/items', express.static(moviesPath));
// landing page for /items
app.get('/items', (req, res) => {
    res.status(404).sendFile(__dirname + defaultVideoPath);
});
// hosts json originally taken from movieList.json
app.get('/movieList', (req, res) => {
    res.json(movieList);
});
// video players request '/play?id={movieId}' 
// Which redirects to '/items/${relative file path}' or given url
// this is done so that paths wont be sent across urls  
app.get('/play', (req, res) => {
    const movieId = req.query.id;
    try {
        if (movieList[movieId]) {
            // parse file path. to check if its a url
            // (this only exists to make testing easier)
            const url_parts = new URL(movieList[movieId].moviePath);
            if (url_parts.protocol === 'http:' || url_parts.protocol === 'https:') {
                // redirec to url
                res.redirect(`${movieList[movieId].moviePath}`);
            }
        }
        else {
            throw "Movie not found!";
        }
    }
    catch (error) {
        console.log(error);
        // items/${relative path}
        res.redirect(`/items/${movieList[movieId] ? movieList[movieId].moviePath : ""}`);
    }
})
// a better way to add movie titles in the future
// should also change current hosting 
app.get('/add', (req, res) => {
    res.send('<h1>Gotta implement this...</h1>');
});
// bad route
app.all('*', (req, res) => {
    res.status(404).send('<h1>Route not found!</h1>')
})
// launch server
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}/`));