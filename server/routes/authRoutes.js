const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
  refreshToken,
  logout,
} = require("../controllers/authControllers");
const verifyJWT = require("../middleware/authMiddleware");

router.post("/registerAdmin", registerAdmin);

router.post("/loginAdmin", loginAdmin);

router.get("/refreshToken", refreshToken);

router.post("/logout", logout);

router.get("/getAdmin", verifyJWT, getAdmin);

module.exports = router;
