const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");

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

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return next(errorHandler(404, "Credentiials are not valid"));
    const validPassowrd = await bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword)
      return next(errorHandler(404, "Credentials are not valid"));
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp };
