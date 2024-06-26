// load all the models
const Movie = require("../models/movie");

const getMovies = async (search, genres, sort) => {
  try {
    const movies = await Movie.find().populate("genres");
    let filteredMovies = [...movies];

    // Search by keyword in the title
    if (search) {
      const searchKeyword = search.toLowerCase();
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchKeyword)
      );
    }
    // Filter by genre
    if (genres && genres.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genres.some((genre) => genres.includes(genre.name))
      );
    }

    // Sort by Country or Released date
    if (sort) {
      const sortBy = sort;
      filteredMovies.sort((a, b) => {
        if (sortBy === "country") {
          return a.country.localeCompare(b.country);
        } else if (sortBy === "release_date") {
          return new Date(a.release_date) - new Date(b.release_date);
        }
      });
    }

    return filteredMovies;
  } catch (error) {
    throw new Error(error);
  }
};

// get 1 movie
const getMovie = async (id) => {
  const movie = await Movie.findById(id).populate("genres");
  return movie;
};

// add
const addMovie = async (
  title,
  country,
  genres,
  release_date,
  director,
  cast,
  image,
  description
) => {
  // create new movie
  const newMovie = new Movie({
    title,
    country,
    genres,
    release_date,
    director,
    cast,
    image,
    description,
  });
  // save the movie with mongodb
  await newMovie.save();
  return newMovie;
};

// update

const updateMovie = async (
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
) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    movie_id,
    {
      title,
      country,
      genres,
      release_date,
      director,
      cast,
      image,
      description,
      status,
    },
    { new: true } // send in the updated data
  );
  return updatedMovie;
};

//delete
const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
