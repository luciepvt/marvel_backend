const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  favorites: {
    favoritesCharacters: [],
    favoritesComics: [],
  },
  token: String,
  hash: String,
  salt: String,
});
module.exports = User;
