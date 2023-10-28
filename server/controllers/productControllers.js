const pool = require("../config/db");

const getAllProducts = (req, res) => {
  res.json({ message: "All Products." });
};

const createProduct = async (req, res) => {
  try {
    const { category_id, product_name, description, qty_instock, feature } =
      req.body;

    const picture = req.File.name;

    const newProduct = await pool.query(
      "INSERT INTO product (category_id, product_name, description, qty_instock, picture_path, feature) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [category_id, product_name, description, qty_instock, picture, feature]
    );

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const createProduct = async (req, res) => {
//   try {
//     const {
//       category_id,
//       product_name,
//       description,
//       qty_instock,
//       picture_path,
//       feature,
//     } = req.body;

//     const newProduct = await pool.query(
//       "INSERT INTO product ( category_id, product_name, description, qty_instock, picture_path,feature) VALUES (category_id, product_name, description, qty_instock, picture_path,feature) RETURNING *",
//       [
//         category_id,
//         product_name,
//         description,
//         qty_instock,
//         picture_path,
//         feature,
//       ]
//     );

//     res.status(200).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log(error);
//   }
// };

const getProductDetail = (req, res) => {
  res.json({ message: "Product Detail." });
};

const updateProduct = (req, res) => {
  res.json({ message: "Update A Product." });
};

const delProduct = (req, res) => {
  res.json({ message: "Delete A Product." });
};

module.exports = {
  getProductDetail,
  getAllProducts,
  createProduct,
  delProduct,
  updateProduct,
};
