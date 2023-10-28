const express = require("express");
const router = express.Router();
const {
  getProductDetail,
  getAllProducts,
  createProduct,
  delProduct,
  updateProduct,
} = require("../controllers/productControllers");
//const picUploadMiddleware = require("../middleware/picUploadMiddleware");

const multer = require("multer");

//Image Upload MULTER

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

router.get("/all", getAllProducts);

router.get("/detail/:id", getProductDetail);

router.post("/add", upload.single("picture"), createProduct);

router.put("/update/:id", updateProduct);

router.delete("/del/:id", delProduct);

module.exports = router;
