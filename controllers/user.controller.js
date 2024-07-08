const test = async (req, res) => {
  try {
    res.json({ message: "confirmed" });
  } catch (error) {
    console.log(error);
  }
};

module.exports ={test}