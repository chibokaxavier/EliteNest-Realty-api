const { response } = require("express");
const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");

const updateUser = async (req, res, next) => {
  const { userName, email, password, avatar } = req.body;
  // if (req.user.id.toString() !== req.params.id.toString()) {
  //   return console.log(req.user.id);
  // }
  if (req.user.id.toString() !== req.params.id.toString()) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
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
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true, runValidators: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json({ user: rest });
  } catch (error) {
    next(error);
  }
};
module.exports = { updateUser };
