const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const existingUsername = await User.findOne({ userName });
    const existingEmail = await User.findOne({ email });
    if (existingUsername) {
      // Return an error response if username already exists
      return res.status(400).json({ message: "Username already exists" });
    }
    if (existingEmail) {
      // Return an error response if username already exists
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Credentials are not valid"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(404, "Credentials are not valid"));
    const token = jwt.sign(
      { id: validUser._id.toString() },
      process.env.JWT_SECRET
    );
    const { password: pass, ...user } = validUser._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
const googleSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        { id: existingUser._id.toString() },
        process.env.JWT_SECRET
      );
      const { password: pass, ...userWithoutPassword } = existingUser._doc;
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ user: userWithoutPassword });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      let username = req.body.name.toLowerCase();
      if (username.includes(" ")) {
        username =
          username.split(" ").join("") + Math.random().toString(36).slice(-4);
      } else {
        username = username + Math.random().toString(36).slice(-4);
      }
      const newUser = await User.create({
        userName: username,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      const token = jwt.sign(
        { id: newUser._id.toString() },
        process.env.JWT_SECRET
      );
      const { password: pass, ...user } = newUser._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json({ user });
    }
  } catch (error) {
    next(error);
  }
};
const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User has signed out" });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, googleSignIn, signOut };
