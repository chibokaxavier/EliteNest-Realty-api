const User = require("../models/user.model");
const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const newUser = await User.create({ userName, email, password });
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { signUp };
