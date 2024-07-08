const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const signUp = async (req, res) => {
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
    res.status(500).json({ error });
  }
};

module.exports = { signUp };
