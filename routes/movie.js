const express = require("express");
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
} = require("../controllers/movie");

const router = express.Router();

const Movie = require("../models/movie");

const { isAdmin } = require("../middleware/auth");

// get movies
router.get("/", async (req, res) => {
  try {
    const movies = await getMovies(
      req.query.search,
      req.query.genres,
      req.query.sort
    );
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// get 1 movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovie(req.params.id);
    if (movie) {
      res.status(200).send(movie);
    } else res.status(404).send("Product Not Found");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// add
router.post("/", isAdmin, async (req, res) => {
  try {
    const title = req.body.title;
    const country = req.body.country;
    const genres = req.body.genres;
    const release_date = req.body.release_date;
    const director = req.body.director;
    const cast = req.body.cast;
    const image = req.body.image;
    const description = req.body.description;
    // const genreArray = Array.isArray(genre) ? genre : [genre];
    const newMovie = await addMovie(
      title,
      country,
      genres,
      release_date,
      director,
      cast,
      image,
      description
    );
    res.status(200).send(newMovie);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const movie_id = req.params.id;
    const title = req.body.title;
    const country = req.body.country;
    const genres = req.body.genres;
    const release_date = req.body.release_date;
    const director = req.body.director;
    const cast = req.body.cast;
    const image = req.body.image;
    const description = req.body.description;
    const status = req.body.status;
    // const genreArray = Array.isArray(genre) ? genre : genre.split(",");

    const updatedMovie = await updateMovie(
      movie_id,
      title,
      country,
      genres,
      release_date,
      director,
      cast,
      image,
      description,
      status
    );
    const movie = await Movie.findById(movie_id);
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const movie_id = req.params.id;
    await Movie.findByIdAndDelete(movie_id);
    res.status(200).send("Movie has been successfully deleted.");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
