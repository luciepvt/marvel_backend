const express = require("express");
const router = express.Router();
const axios = require("axios");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/favorites/update", isAuthenticated, async (req, res) => {
  try {
    const { favoriteCharacters, favoriteComics } = req.fields;

    if (favoriteCharacters) {
      req.user.favoriteCharacters = favoriteCharacters;
    }
    if (favoriteComics) {
      req.user.favoriteComics = favoriteComics;
    }
    await req.user.save();
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
