const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

const getAllProducts = async (req, res) => {
  const products = await pool.query("SELECT * FROM product");

  res.status(200).send(products.rows);
};

const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      description,
      price,
      qty_instock,
      status,
      feature,
      category_id,
      picture_path,
      picture,
    } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO product (category_id, product_name, description,price, qty_instock, picture_path, feature, status) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [
        category_id,
        product_name,
        description,
        price,
        qty_instock,
        picture_path,
        feature,
        status,
      ]
    );

    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500);
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

const getProductDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const product_detail = await pool.query(
      "SELECT * FROM product WHERE product_id = $1",
      [id]
    );

    res.status(200).json(product_detail.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error });
  }
};

const updateProduct = (req, res) => {
  res.json({ message: "Update A Product." });
};

const delProduct = (req, res) => {
  const { id } = req.params;

  try {
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getProductDetail,
  getAllProducts,
  createProduct,
  delProduct,
  updateProduct,
};
