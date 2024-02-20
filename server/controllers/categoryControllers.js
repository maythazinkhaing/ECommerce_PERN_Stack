const pool = require("../config/db");

// GET
// ROUTE /categories/all
const getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query("SELECT * FROM product_category");
    // console.log("conntroler :: " + categories.rows);
    res.status(200).json(categories.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//POST
//  ROUTE /categories/add
const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    const newCategory = await pool.query(
      "INSERT INTO product_category (category_name) VALUES ($1) RETURNING *",
      [category_name]
    );
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// PUT
// ROUTE categories/update/:id
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const updatedCategory = await pool.query(
      "UPDATE product_category SET category_name = $1 WHERE category_id = $2",
      [category_name, id]
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// DELETE
// ROUTE categories/del/:id
const delCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM product_category WHERE category_id = $1", [
      id,
    ]);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  delCategory,
  updateCategory,
};
