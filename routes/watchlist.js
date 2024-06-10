const express = require("express");
const {
  getWatchlists,
  getWatchlist,
  addNewWatchlist,
  updateWatchlist,
  removeFromWatchlist,
} = require("../controllers/watchlist");

const router = express.Router();

const Watchlist = require("../models/watchlist");

const { isUserValid, isAdmin } = require("../middleware/auth");

router.get("/", isUserValid, async (req, res) => {
  try {
    const watchlists = await getWatchlists(req.user);
    res.status(200).send(watchlists);
    // let filter = {};
    // if (req.user && req.user.role === "user") {
    //   filter.user = req.user._id;
    // }
    // res.status(200).send(await Watchlist.find(filter).sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", isUserValid, async (req, res) => {
  try {
    const user_id = req.user._id;
    const movie_id = req.params.id;
    const watchlist = await getWatchlist(movie_id, user_id);
    // console.log(watchlist);

    res.status(200).send(watchlist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", isUserValid, async (req, res) => {
  try {
    const user_id = req.user._id;
    const movie_id = req.body.movie_id;

    const addWatchlist = await addNewWatchlist(movie_id, user_id);
    res.status(200).send(addWatchlist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", isUserValid, async (req, res) => {
  try {
    const { status } = req.body;
    const movieId = req.params.id;
    const userId = req.user._id;
    const updatedWatchlist = await updateWatchlist(userId, movieId, status);
    res.status(200).send(updatedWatchlist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", isUserValid, async (req, res) => {
  try {
    const user_id = req.user._id;
    const movieId = req.params.id;
    const updatedWatchlist = await removeFromWatchlist(movieId, user_id);
    res.status(200).send(updatedWatchlist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
