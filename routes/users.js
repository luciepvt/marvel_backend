const express = require("express");
const router = express.Router();
const User = require("../models/User");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//******************************************************************************************************************************************//
//                                                                           Signup                                                         //
//******************************************************************************************************************************************//

router.post("/user/signup", async (req, res) => {
  try {
    const { email, password, favoriteCharacters, favoriteComics } = req.fields;

    // console.log(req.fields);
    const isEmailAlreadyExist = await User.findOne({
      email: email,
    });
    if (isEmailAlreadyExist !== null) {
      res
        .status(400)
        .json({ message: "this email is already linked to another account" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const newUser = new User({
        email: email,
        token: token,
        hash: hash,
        salt: salt,
        favoriteCharacters: favoriteCharacters,
        favoriteComics: favoriteComics,
      });
      newUser.save();
      res.json({
        _id: newUser._id,
        email: newUser.email,
        token: newUser.token,
        favoriteCharacters: newUser.favoriteCharacters,
        favoriteComics: newUser.favoriteComics,
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

//******************************************************************************************************************************************//
//                                                                           Login                                                          //
//******************************************************************************************************************************************//

router.post("/user/login", async (req, res) => {
  try {
    const loggedUser = await User.findOne({
      email: req.fields.email,
    });
    if (loggedUser === null) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      const newHash = SHA256(req.fields.password + loggedUser.salt).toString(
        encBase64
      );
      if (newHash !== loggedUser.hash) {
        res.status(400).json({ message: "Unauthorized" });
      } else {
        res.status(200).json({
          _id: loggedUser._id,
          email: loggedUser.email,
          token: loggedUser.token,
          favoriteCharacters: loggedUser.favoriteCharacters,
          favoriteComics: loggedUser.favoriteComics,
        });
      }
    }
    console.log(req.fields);
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
});

module.exports = router;
