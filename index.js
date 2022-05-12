require("dotenv").config();
const express = require("express");
const formidableMiddleWare = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(formidableMiddleWare());

const usersRoute = require("./routes/users");
app.use(usersRoute);

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
