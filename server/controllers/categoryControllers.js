const getAllCategories = (req, res) => {
  res.json({ message: "All Categories." });
};

const createCategory = (req, res) => {
  res.json({ message: "Create A Category." });
};

const updateCategory = (req, res) => {
  res.json({ message: "Update A Category." });
};

const delCategory = (req, res) => {
  res.json({ message: "Delete A Category." });
};

module.exports = {
  getAllCategories,
  createCategory,
  delCategory,
  updateCategory,
};
