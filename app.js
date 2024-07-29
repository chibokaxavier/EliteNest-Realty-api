const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001;
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    message,
    statusCode,
    success: false,
  });
});
