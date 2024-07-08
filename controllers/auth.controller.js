const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const signUp = async (req, res,next) => {
  try {
    const { userName, email, password } = req.body;
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

module.exports = { signUp };
