const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const watchListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  status: {
    type: String,
    enum: ["Want to watch", "Watching", "Watched"],
    default: "Want to watch",
  },
});

const Watchlist = model("Watchlist", watchListSchema);
module.exports = Watchlist;
