const express = require("express");
const router = express.Router();
const axios = require("axios");

//******************************************************************************************************************************************//
//                                                          Get a list of comics                                                            //
//******************************************************************************************************************************************//
router.get("/comics", async (req, res) => {
  try {
    const page = req.query.page ? Number(raq.query.page) : 1;
    const skip = (req.query.page - 1) * 100;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&page=${page}&skip=${skip}&title=${req.query.search}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//******************************************************************************************************************************************//
//                                             Get a list of comics containing a specific character                                         //
//******************************************************************************************************************************************//

router.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
