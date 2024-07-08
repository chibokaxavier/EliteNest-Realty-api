const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001;
require("dotenv").config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    app.listen(port, console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error);  
  }
};
start();
