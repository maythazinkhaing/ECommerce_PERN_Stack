const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");
const verifyRoles = require("./middleware/verifyRoles");
const ROLE_LIST = require("./config/role_list");
const path = require("path");
const {
  getAllProducts,
  getProductsDetails,
} = require("./controllers/productControllers");
const { getAllCategories } = require("./controllers/categoryControllers");
const { handleWebhook, checkout } = require("./controllers/checkoutController");
const port = process.env.PORT || 8000;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
  })
);

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(cookieParser());

app.use("/auth", require("./routes/authRoutes"));

app.get("/products/all", getAllProducts);
app.get("/categories/all", getAllCategories);
app.get("/products/productsDetails/:ids", getProductsDetails);

app.use(verifyJWT);
app.use("/products", require("./routes/productsRoutes"));
app.use(
  "/categories",
  verifyRoles(ROLE_LIST.Admin),
  require("./routes/categoryRoutes")
);
app.use("/cart", require("./routes/cartRoutes"));
app.post("/stripe/create-checkout-session", checkout);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
