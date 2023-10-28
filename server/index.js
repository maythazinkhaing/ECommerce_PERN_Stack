const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const pool = require("./config/db");
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", require("./routes/productsRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));

app.listen(port, () => console.log(`Server is running on port ${port}.`));
