const express = require("express");
const router = express.Router();
const {
  checkout,
  handleWebhook,
} = require("../controllers/checkoutController");

// /stripe/create-checkout-session
// router.post("/create-checkout-session", checkout);

// ROUTE /stripe/webhook
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   handleWebhook
// );

module.exports = router;
