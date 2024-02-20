const express = require("express");
const {
  addToCart,
  decreaseInCart,
  getCartItems,
} = require("../controllers/cartControllers");
const router = express.Router();

// ROUTE cart/add
router.post("/add", addToCart);

// ROUTE cart/cartItems
router.get("/cartItems/:user_id", getCartItems);

//ROUTE cart/decrease
router.post("/decrease", decreaseInCart);

module.exports = router;
