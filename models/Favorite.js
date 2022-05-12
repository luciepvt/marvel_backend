import mongoose from "mongoose";
const mongoose = require("mongoose");
const Favorite = mongoose.model("Favorite", {
  id: String,
  title: String,
  type: String,
  picture: { path: String, extension: String },
  description: String,
  comics: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = Favorite;
