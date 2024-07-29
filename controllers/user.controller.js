const { response } = require("express");
const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");

const updateUser = async (req, res, next) => {
  const { userName, email, password, avatar } = req.body;
  if (req.user.id.toString() !== req.params.id.toString()) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
    const existingUsername = await User.findOne({ userName });
    const existingEmail = await User.findOne({ email });
    if (existingUsername && req.user.userName) {
      // Return an error response if username already exists
      return next(errorHandler(404, "Username already exists"));
    }
    if (existingEmail && req.user.email) {
      // Return an error response if username already exists
      return next(errorHandler(404, "Email already exists"));
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

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    returnnext(errorHandler(401, "You can only delete your own account "));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("token");
    res
      .status(200)
      .json({ message: "Successfully deleted user" })
  } catch (error) {
    next(error);
  }
};
module.exports = { updateUser, deleteUser };
