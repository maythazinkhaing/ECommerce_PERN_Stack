const express = require("express");
const router = express.Router();
const picUploadMiddleware = require("../middleware/picUploadMiddleware");
const {
  getProductDetail,

  createProduct,
  delProduct,
  updateProduct,
  getProductsDetails,
} = require("../controllers/productControllers");
const verifyRoles = require("../middleware/verifyRoles");
const ROLE_LIST = require("../config/role_list");

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
  storage: storage,
});

router.get("/detail/:id", getProductDetail);

router.post(
  "/add",
  verifyRoles(ROLE_LIST.Admin),
  picUploadMiddleware,
  createProduct
);

router.put(
  "/update/:id",
  verifyRoles(ROLE_LIST.Admin),
  upload.single("picture"),

  updateProduct
);

router.delete("/del/:id", verifyRoles(ROLE_LIST.Admin), delProduct);

module.exports = router;
