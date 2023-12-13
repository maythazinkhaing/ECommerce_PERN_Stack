const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = process.env.PORT || 8000;

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(cookieParser());

app.use("/auth", require("./routes/authRoutes"));

app.use(verifyJWT);
app.use("/products", require("./routes/productsRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
