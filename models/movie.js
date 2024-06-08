const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// setup the schema
const movieSchema = new Schema({
  title: { type: String, required: true },
  country: { type: String, required: true },
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  release_date: { type: String },
  director: { type: String, required: true },
  cast: { type: Array, required: true },
  image: { type: String },
  description: { type: String },
  status: {
    type: String,
    default: "Want to watch",
    enum: ["Want to watch", "Watching", "Watched"],
  },
});

// convert the schema to a model
const Movie = model("Movie", movieSchema);
module.exports = Movie;
