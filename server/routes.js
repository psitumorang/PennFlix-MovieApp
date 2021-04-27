const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
// Equivalent to: function getTop20Keywords(req, res) {}
const getTop20Keywords = (req, res) => {
var query = `WITH highest_ranked AS (SELECT movie_id, movie_title, vote_average FROM movies
             ORDER BY vote_average DESC LIMIT 600), highest_rev AS (SELECT movie_id, movie_title, revenue FROM movies
             ORDER BY revenue DESC LIMIT 600), movie_keywords AS (SELECT m.movie_id, k.keyword FROM movies m JOIN about a ON m.movie_id = a.movie_id
             JOIN keyword k ON k.keyword_id = a.keyword_id)
             SELECT DISTINCT keyword FROM movie_keywords LIMIT 10;`;

//'SELECT movie_title as movie, vote_average as rating FROM movies ORDER BY vote_average DESC, movie_title LIMIT 10;
//  var query = 'SELECT kwd_name FROM movie_keyword GROUP BY kwd_name ORDER BY COUNT(movie_id) DESC LIMIT 20;';
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- Q1b (Dashboard) ---- */
const getTopMovies = (req, res) => {
  var query = `WITH intermediate AS (SELECT m.movie_id, m.movie_title as movie, m.overview FROM movies m
WHERE m.vote_count > (SELECT AVG(vote_count) FROM movies)
ORDER BY m.vote_average DESC, m.movie_title LIMIT 10)
SELECT m.movie, m.overview, g.genre FROM intermediate m JOIN movie_genre mg ON mg.movie_id = m.movie_id JOIN genre g ON g.genre_id = mg.genre_id GROUP BY m.movie;`;
  // SELECT m.movie_title as movie, m.overview
  //              FROM movies m JOIN movie_genre mg ON mg.movie_id = m.movie_id
  //              JOIN genre g ON g.genre_id = mg.genre_id
  //              ORDER BY m.vote_average DESC, m.movie_title LIMIT 10;
  connection.query(query, function(err, rows, field) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};


/* ---- Q2 (Recommendations) ---- */
const getRecs = (req, res) => {
  var movieName = req.params.movieName;
  var query = `
  WITH tmp AS (SELECT m.movie_id, ci.cast_id, ci.charac FROM movie m JOIN cast_in ci ON m.movie_id = ci.movie_id WHERE m.title = '${movieName}'),
  tmp2 AS (SELECT cast_in.movie_id, COUNT(tmp.cast_id) AS cast_count FROM tmp, cast_in
  WHERE tmp.cast_id = cast_in.cast_id AND cast_in.movie_id NOT IN (SELECT movie_id FROM tmp) GROUP BY cast_in.movie_id)
  SELECT m.title, m.movie_id, m.rating, m.num_ratings FROM movie m, tmp2 WHERE m.movie_id = tmp2.movie_id
  ORDER BY tmp2.cast_count DESC, m.rating DESC, m.num_ratings DESC LIMIT 10;
  `;
  connection.query(query, function(err, rows, field) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};


/* ---- Q3a (Best Movies) ---- */
const getDecades = (req, res) => {
  const query = `
  SELECT DISTINCT release_year - MOD(release_year, 10) AS decade FROM movie ORDER BY decade ASC;
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  })

};


/* ---- (Best Movies) ---- */
const getGenres = (req, res) => {
  const query = `
    SELECT name
    FROM genre
    WHERE name <> 'genres'
    ORDER BY name ASC;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q3b (Best Movies) ---- */
const bestMoviesPerDecadeGenre = (req, res) => {
  var decade = req.params.decade;
  var genre = req.params.genre;
  const query = `
  WITH a AS (SELECT movie.title, movie_genre.movie_id, movie_genre.genre_name, movie.rating, movie.release_year - MOD(movie.release_year, 10) AS decade
  FROM movie_genre JOIN movie ON movie_genre.movie_id = movie.movie_id),
  b AS (SELECT genre_name, AVG(rating) AS avg_rating FROM a WHERE a.decade = '${decade}' GROUP BY genre_name),
  c AS (SELECT title, movie_id, genre_name, rating FROM a WHERE a.decade = '${decade}' AND a.genre_name = '${genre}'),
  d AS (SELECT c.title, c.movie_id, a.genre_name, a.rating, a.decade
    FROM c JOIN a WHERE c.movie_id = a.movie_id AND c.title = a.title),
  e AS (SELECT DISTINCT d.movie_id FROM d, b WHERE d.genre_name = b.genre_name AND d.rating < b.avg_rating),
  f AS (SELECT DISTINCT d.movie_id FROM d WHERE d.movie_id NOT IN (SELECT movie_id FROM e))
  SELECT DISTINCT movie.movie_id, movie.title, movie.rating FROM movie, f WHERE f.movie_id = movie.movie_id
  ORDER BY title ASC LIMIT 100;
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  })
};

module.exports = {
	getTop20Keywords: getTop20Keywords,
	getTopMovies: getTopMovies,
	getRecs: getRecs,
  getDecades: getDecades,
  getGenres: getGenres,
  bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre
};
