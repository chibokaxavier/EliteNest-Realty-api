const test = async (req, res) => {
  try {
    res.json({ message: "confirmed" });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {};
module.exports = { test, updateUser };
