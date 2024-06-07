const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const watchListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const Watchlist = model("Watchlist", watchListSchema);
module.exports = Watchlist;
