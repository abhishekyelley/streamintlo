# streamintlo

⚠️ Currently only supports H.264 mp4 files. Need to find a solution.

⚠️ HTML5 only supoorts `.vtt` subtitles provided as a separate file.

## Setup

* NOTE: Make sure to get node and npm installed

#### Clone the repo and install the dependencies.

```bash
git https://github.com/abhishekyelley/streamintlo.git
cd streamintlo
```

#### Then run this command at that directory
```bash
npm install
```

#### Useful tool for reload on save (optional)
```bash
npm install -g nodemon
```

#### Launch project
```bash
npm start
``` 
or if you have nodemon installed
```bash
npm run dev
```

***

## Routes

`server.js` is the where the server is lauunched. From here, files in `/public` are served when invoked by `localhost:8080/${filename}`

`index.html` will be served at `localhost:8080/` by default. Rest all can be reached by `localhost:8080/${filename}`


### All routes

* NOTE: `moviePath` refers to a relative path from inside of `/assets/`

| Route | Action |
| :- | :- |
| `localhost:8080/` | Serves `index.html` |
| `localhost:8080/movieList` | Serves `movieList.json` |
| `localhost:8080/items` | Serves `assets/404.mp3` |
| `localhost:8080/items/:moviePath` | Serves file provided after the slash from `/assets` |
| `localhost:8080/play` | Redirects to `localhost:8080/items` |
| `localhost:8080/play?id=${movieId}` | Redirectos to `localhost:8080/items/:moviePath`  where `moviePath` is `movieList[movieId].moviePath`|
| `localhost:8080/add` | ⚠️ **To be implemented**. Should add unique `movieId`, `movieTitle`, `moviePath`, `...` to `movieList.json` |
| `localhost:8080/*` | Serves generic `404` text |

***

## Pages

`style.css` is the only css file for both `index.html` and `player.html`

### `index.html`

`index.html` is linked to `index.js`

`index.js` fetches movie details from `localhost:8080/movieList` and each `movieId` is displayed with it's title in an anchor tag `<a>` with `href="/player.html?id=${movieId}"`

### `player.html`

`player.html` is linked to `player.js`

Contains a video player which has a source tag `<source>`

`player.js` fetches movie details from `localhost:8080/movieList` and gets the metadata like `movieTitle`, `moviePath`, `subtitles` and `audioTracks` **(To be implemented)**

`player.js` changes the `src` attribute of `<source>` to `/play?id=${movieId}` which in turn redirects to `localhost:8080/items/${movieId}`. Refer [Routes](#all-routes)

Aight! Your turn now!