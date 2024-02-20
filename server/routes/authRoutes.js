const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  refreshToken,
  logout,
  getAllUsers,
} = require("../controllers/authControllers");
const verifyJWT = require("../middleware/authMiddleware");

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.get("/refreshToken", refreshToken);

router.post("/logout", logout);

router.get("/getUser", verifyJWT, getUser);

router.get("/getAllUsers", getAllUsers);

module.exports = router;
