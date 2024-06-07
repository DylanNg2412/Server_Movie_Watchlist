const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());

// set the uploads folder as a static path
app.use("/uploads", express.static("uploads"));

// middleware to setup a CORS policy
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

// apply the CORS to middleware
app.use(corsHandler);

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/moviewebsite")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log(error);
  });

// Routes
const movieRouter = require("./routes/movie");
const genresRouter = require("./routes/genre");
const userRoute = require("./routes/user");
const imagesRoute = require("./routes/image");
const watchlistRoute = require("./routes/watchlist");

// App
app.use("/movies", movieRouter);
app.use("/genres", genresRouter);
app.use("/user", userRoute);
app.use("/images", imagesRoute);
app.use("/watchlist", watchlistRoute);

// Start the server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
