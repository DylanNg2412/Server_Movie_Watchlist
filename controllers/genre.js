const Movie = require("../models/movie");
const Genre = require("../models/genre");
const { updateMovie } = require("./movie");

const getGenres = async () => {
  const genres = await Genre.find();
  return genres;
};

const getGenre = async (_id) => {
  const genre = await Genre.findById(_id);
  return genre;
};

const addNewGenre = async (name) => {
  const newGenre = new Genre({
    name: name,
  });
  //save
  await newGenre.save();
  return newGenre;
};

const updateGenre = async (_id, name) => {
  const updatedGenre = await Genre.findByIdAndUpdate(
    _id,
    {
      name: name,
    },
    {
      new: true,
    }
  );
  return updatedGenre;
};

const deleteGenre = async (_id) => {
  // make sure if there is no Genre assigned to the products
  const movies = await Movie.find({ genre: _id });
  //if product is not empty
  if (movies && movies.length > 0) {
    throw new Error("This genre is currently in use");
  }
  const deletedGenre = await Genre.findByIdAndDelete(_id);
  return deletedGenre;
};

module.exports = {
  getGenres,
  getGenre,
  addNewGenre,
  updateGenre,
  deleteGenre,
};
