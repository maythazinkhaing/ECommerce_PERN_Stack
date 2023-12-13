const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register
//POST
const registerAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please Fill in all field");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  const admin = await pool.query(
    "INSERT INTO admin (username , email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashPwd]
  );
  if (admin) {
    res.status(201).json({
      id: admin.rows[0].id,
      username: admin.rows[0].username,
      email: admin.rows[0].email,
    });
  } else {
    res.status(400);
    throw new Error("No Admin Data");
  }
});

//LOGIN
//POST
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const refresh = generateRefreshToken(username);
  //console.log("refresh ::: " + refresh);
  //console.log("User and Pwd  :" + username, password);
  if (!username || !password) {
    res.status(400);
    throw new Error("Please Fill in all field");
  }
  //check admin
  const admin = await pool.query("SELECT * FROM admin WHERE username = $1", [
    username,
  ]);

  if (
    admin.rows[0] &&
    (await bcrypt.compare(password, admin.rows[0].password))
  ) {
    res.cookie("jwt", refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      id: admin.rows[0].id,
      username: admin.rows[0].username,
      email: admin.rows[0].email,
      accessToken: generateAccessToken(username),
    });
  } else {
    res.status(401);
    throw new Error("Invalild Credential.");
  }
});

//REFRESH TOKEN
// @ GET auth/refreshToken
const refreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const foundUser = pool.query(
        "SELECT username FROM admin WHERE username = $1",
        [decoded.username]
      );

      if (!foundUser) return res.sendStatus(401);
      const { username } = (await foundUser).rows[0];
      const accessToken = generateAccessToken({ username });
      res.json({ accessToken });
    })
  );
};

//LOGOUT
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204); //no content
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Cookie Cleared!" });
};

//GET ADMIN
const getAdmin = asyncHandler(async (req, res) => {
  const data = await pool.query(
    "SELECT id, username, email FROM admin WHERE username = $1",
    [req.user]
  );

  const { id, username, email } = data.rows[0];
  res.status(200).json({
    id,
    username,
    email,
  });
});

//GENERATE ACCESS TOKEN
const generateAccessToken = (username) => {
  return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

//GENERATE REFRESH TOKEN
const generateRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { registerAdmin, loginAdmin, getAdmin, refreshToken, logout };
