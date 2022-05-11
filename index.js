const express = require("express");
const formidableMiddleWare = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(formidableMiddleWare());

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
