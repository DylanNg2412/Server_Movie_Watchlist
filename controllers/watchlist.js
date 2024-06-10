const axios = require("axios");

const Watchlist = require("../models/watchlist");
const Movie = require("../models/movie");

const getWatchlists = async (user) => {
  try {
    // let filters = {};
    // if (user && user.role === "user") {
    //   filters.user = user._id;
    // }
    const watchlists = await Watchlist.find({ user: user._id })
      .sort({ _id: -1 })
      .populate("movie");
    return watchlists;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getWatchlist = async (movie_id, user_id) => {
  try {
    const watchlist = await Watchlist.findOne({
      user: user_id,
      movie: movie_id,
    }).populate("movie");

    return watchlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addNewWatchlist = async (movie_id, user_id) => {
  try {
    // Find the user's watchlist
    const movie = await Movie.findById(movie_id);

    if (!movie) {
      throw new Error("Movie not found");
    }

    const userWatchlist = await Watchlist.findOne({
      user: user_id,
      movie: movie_id,
    });

    if (userWatchlist) {
      await Watchlist.deleteOne({ user: user_id, movie: movie_id });
      return { message: "Movie removed from watchlist" };
    } else {
      const userWatchlist = new Watchlist({ user: user_id, movie: movie_id });
      await userWatchlist.save();
      return { message: "Movie added to watchlist" };
    }
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    throw error;
  }
};

const updateWatchlist = async (userId, movieId, status) => {
  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new Error("User or movie not found");
    }

    let watchlistItem = await Watchlist.findOne({
      user: userId,
      movie: movieId,
    });

    if (!watchlistItem) {
      throw new Error("Need to add to watchlist first");
    }

    if (
      status !== "Want to watch" &&
      status !== "Watching" &&
      status !== "Watched"
    ) {
      throw new Error("Status should be want to watch, watching or watched");
    }

    watchlistItem.status = status;
    await watchlistItem.save();
    return watchlistItem;
  } catch (error) {
    throw new Error(error.message);
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
