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
    if (!validUser) return next(errorHandler(404, "User doesnt exist"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(404, "Credentials are not valid"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...user } = validUser._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
