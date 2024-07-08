const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001;
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
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
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    message,
    statusCode,
    success: false,
  });
});
