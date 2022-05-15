const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  token: String,
  hash: String,
  salt: String,
  favoriteCharacters: { type: [Object], default: [] },
  favoriteComics: { type: [Object], defaut: [] },
});
module.exports = User;
