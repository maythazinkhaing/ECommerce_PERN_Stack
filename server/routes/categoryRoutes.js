const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  delCategory,
  updateCategory,
} = require("../controllers/categoryControllers");

router.get("/all", getAllCategories);

router.post("/add", createCategory);

router.put("/update/:id", updateCategory);

router.delete("/del/:id", delCategory);

module.exports = router;
