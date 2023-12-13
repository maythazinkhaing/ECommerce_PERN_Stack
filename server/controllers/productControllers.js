//const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

const getAllProducts = async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT p.*, pc.category_name FROM product p LEFT JOIN product_category pc ON p.category_id = pc.category_id"
    );

    res.status(200).send(products.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
      category,
      picture_path,
      picture,
    } = req.body;

    console.log("FrOm create Prouct :: " + req.file.filename);
    const pic = `http://localhost:3001/assets/${picture_path}`;

    const newProduct = await pool.query(
      "INSERT INTO product (category_id, product_name, description,price, qty_instock, picture_path, feature, status) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [
        category,
        product_name,
        description,
        price,
        qty_instock,
        pic,
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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      product_name,
      description,
      price,
      qty_instock,
      status,
      feature,
      category,
      picture_path,
      picture,
    } = req.body;

    //console.log("FrOm update Prouct :: " + req.file.picture);
    const pic = `http://localhost:3001/assets/${picture_path}`;
    const updatedFeature = feature !== "undefined" ? feature : false;
    const updatedStatus = status !== "undefined" ? status : false;
    var updatedProduct;

    if (!picture_path) {
      updatedProduct = await pool.query(
        " UPDATE product SET product_name = $1,  description= $2 ,price= $3 , qty_instock = $4, feature = $5, status =$6, category_id = $7 WHERE product_id = $8 ",
        [
          product_name,
          description,
          price,
          qty_instock,
          updatedFeature,
          updatedStatus,
          category,
          id,
        ]
      );
    } else {
      const product = await pool.query(
        "SELECT * FROM product WHERE product_id = $1",
        [id]
      );

      const imagePath = path.join(
        __dirname,
        "../public/assets",
        path.basename(product.rows[0].picture_path)
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to delete image" });
        }
      });

      updatedProduct = await pool.query(
        " UPDATE product SET product_name = $1,  description= $2 ,price= $3 , qty_instock = $4, feature = $5, status =$6, category_id = $7, picture_path = $8 WHERE product_id = $9 ",
        [
          product_name,
          description,
          price,
          qty_instock,
          updatedFeature,
          updatedStatus,
          category,
          pic,
          id,
        ]
      );
    }

    res.status(200).json(updatedProduct);

    // const newProduct = await pool.query(
    //   "INSERT INTO product (category_id, product_name, description,price, qty_instock, picture_path, feature, status) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
    //   [
    //     category,
    //     product_name,
    //     description,
    //     price,
    //     qty_instock,
    //     pic,
    //     feature,
    //     status,
    //   ]
    // );

    // res.status(200).json(newProduct);
  } catch (error) {
    console.log("ERROR : " + error.message);
    res.status(500);
  }
};

//DELETE PRODUCT
const delProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await pool.query(
      "SELECT * FROM product WHERE product_id = $1",
      [id]
    );
    await pool.query("DELETE FROM product WHERE product_id = $1", [id]);
    const imagePath = path.join(
      __dirname,
      "../public/assets",
      path.basename(product.rows[0].picture_path)
    );
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete image" });
      }

      res
        .status(200)
        .json({ message: "Product and image deleted successfully" });
    });
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
