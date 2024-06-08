const axios = require("axios");

const Watchlist = require("../models/watchlist");

const getWatchlists = async (user) => {
  try {
    let filters = {};
    if (user && user.role === "user") {
      filters.user = user._id;
    }
    const watchlists = await Watchlist.find(filters)
      .sort({ _id: -1 })
      .populate("movies");
    return watchlists;
  } catch (error) {
    throw new Error(error);
  }
};

const getWatchlist = async (user_id) => {
  const watchlist = await Watchlist.find({ user: user_id }).populate("movies");
  return watchlist;
};

const addNewWatchlist = async (movie_id, user_id) => {
  // Use await to find the user's watchlist
  const userWatchlist = await Watchlist.findOne({ user: user_id });

  if (!userWatchlist) {
    // If the user does not have a watchlist, create a new one
    const newWatchlist = new Watchlist({
      user: user_id,
      movies: [movie_id], // Assuming movies is an array
    });
    await newWatchlist.save();
    return newWatchlist;
  } else {
    // If the user already has a watchlist, check if the movie is already in the list
    if (!userWatchlist.movies.includes(movie_id)) {
      userWatchlist.movies.push(movie_id); // Add the movie to the watchlist if it's not already there
      await userWatchlist.save(); // Save the updated watchlist
    }
    return userWatchlist;
  }
};

const updateWatchlist = async (
  movie_id,
  userName,
  userEmail,
  movies,
  status
) => {
  try {
    const updatedWatchlist = await Watchlist.findByIdAndUpdate(movie_id, {
      userName,
      userEmail,
      movies,
      status,
    });
    return updatedWatchlist;
  } catch (error) {
    throw new Error(error);
  }
};

const removeFromWatchlist = async (movieId, user_id) => {
  const userWatchlist = await Watchlist.findOne({ user: user_id });
  if (!userWatchlist) {
    throw new Error("Watchlist not found");
  } else {
    // Remove the movie from the watchlist
    userWatchlist.movies = userWatchlist.movies.filter(
      (id) => id.toString() !== movieId
    );
    await userWatchlist.save();
    return userWatchlist;
  }
};

module.exports = {
  getWatchlists,
  getWatchlist,
  addNewWatchlist,
  updateWatchlist,
  removeFromWatchlist,
};
