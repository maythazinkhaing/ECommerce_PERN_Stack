const pool = require("../config/db");

const getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query("SELECT * FROM product_category");

    res.status(200).json(categories.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const createCategory = async (req, res) => {
  try {
    const { cate_name } = req.body;

    const newCategory = await pool.query(
      "INSERT INTO product_category (category_name) VALUES ($1) RETURNING *",
      [cate_name]
    );
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
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
