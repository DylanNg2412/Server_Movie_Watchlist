const express = require("express");
const {
  getWatchlists,
  getWatchlist,
  addNewWatchlist,
  updateWatchlist,
  deleteWatchlist,
} = require("../controllers/watchlist");

const router = express.Router();

const Watchlist = require("../models/watchlist");

const { isUserValid, isAdmin } = require("../middleware/auth");

router.get("/", isUserValid, async (req, res) => {
  try {
    const watchlists = await getWatchlists();
    res.status(200).send(watchlists);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const watchlist = await getWatchlist(user_id);
    // console.log(watchlist);
    res.status(200).send(watchlist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", isUserValid, async (req, res) => {
  try {
    const user_id = req.user._id;
    const movie_id = req.body.movie;
    const addWatchlist = await addNewWatchlist(movie_id, user_id);
    res.status(200).send(addWatchlist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { userName, userEmail, movies, status } = req.body;
    const updatedWatchlist = await updateWatchlist(
      req.params.id,
      userName,
      userEmail,
      movies,
      status
    );
    res.status(200).send(updatedWatchlist);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const watchlist = await getWatchlist(id);
    if (watchlist) {
      await deleteWatchlist(id);
      res.status(200).send("Deleted");
    } else {
      res.status(400).send("Watchlist not found");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
