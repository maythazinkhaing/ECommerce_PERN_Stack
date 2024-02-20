const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

const addToCart = asyncHandler(async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  let newItem;
  // console.log(user_id, product_id, quantity);
  if (!user_id || !product_id || !quantity) {
    res.status(400).json({
      error:
        "Invalid request data. Please provide user_id, product_id, and quantity.",
    });
  }
  //check if the prodcut exist
  const existingProduct = await pool.query(
    "SELECT * FROM user_cart WHERE user_id = $1 AND product_id = $2",
    [user_id, product_id]
  );

  if (existingProduct.rows.length > 0) {
    newItem = await pool.query(
      "UPDATE user_cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
      [quantity, user_id, product_id]
    );
  } else {
    newItem = await pool.query(
      "INSERT INTO user_cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity]
    );
  }
  //console.log(newItem.rows[0]);
  res.status(200).json(newItem.rows[0]);
});

const decreaseInCart = asyncHandler(async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  let newItem;
  // console.log(user_id, product_id, quantity);
  if (!user_id || !product_id || !quantity) {
    res.status(400).json({
      error:
        "Invalid request data. Please provide user_id, product_id, and quantity.",
    });
  }

  newItem = await pool.query(
    "UPDATE user_cart SET quantity = quantity - $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
    [quantity, user_id, product_id]
  );

  if (newItem.rows[0].quantity === 0) {
    await pool.query(
      "DELETE FROM user_cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );
  }

  //console.log(newItem.rows[0]);
  res.status(200).json(newItem.rows[0]);
});

const getCartItems = asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    res.status(400);
    throw new Error("User ID is required!");
  }

  const cartItems = await pool.query(
    "SELECT * FROM user_cart WHERE user_id = $1",
    [user_id]
  );

  res.status(200).json(cartItems.rows);
});

module.exports = {
  addToCart,
  decreaseInCart,
  getCartItems,
};
