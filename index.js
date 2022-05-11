require("dotenv").config();
const express = require("express");
const formidableMiddleWare = require("express-formidable"); //bonus
const mongoose = require("mongoose"); //bonus
const cors = require("cors");

//mongoose.connect("mongodb://localhost:3000/marvel-app"); // bonus

const app = express();
app.use(cors());
app.use(formidableMiddleWare());

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(process.env.PORT, () => {
  console.log("server has started");
});
