const express = require("express");
const router = express.Router();
const axios = require("axios");
const isAuthenticated = require("../middlewares/isAuthenticated");

const Favorite = require("../models/Favorite");

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const response = await Favorite.find({ user: req.user_id });

    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
router.post("/favorites/update", isAuthenticated, async (req, res) => {
  try {
    const { saveId, title, type, picture, description, comics } = req.fields;
    const response = await Favorite.findOne({ id: saveId });
    if (response === nul) {
      const newFavorite = await new Favorite({
        id: saveId,
        title,
        type,
        picture,
        image,
        description,
        comics,
      });
      newFavorite.user = req.fields._id;
      await newFavorite.populate("user");
      await newFavorite.save();
      return res.status(200).json("Favorite added");
    } else {
      await Favorite.deleteOne({ id: saveId });
      return res.json("Favorite deleted");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
