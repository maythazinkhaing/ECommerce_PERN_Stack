const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register
//POST
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please Fill in all field");
  }
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email]
  );

  if (existingUser.rows.length > 0) {
    res.status(400);
    throw new Error("User already exist.");
  }

  const role = { user: 2001 };
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  const user = await pool.query(
    "INSERT INTO users (username , email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, hashPwd, role]
  );
  if (user) {
    res.status(201).json({
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
      role: user.rows[0].role,
    });
  } else {
    res.status(400);
    throw new Error("No User Data");
  }
});

//LOGIN
//POST
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const refresh = generateRefreshToken(username);
  //console.log("refresh ::: " + refresh);
  //console.log("User and Pwd  :" + username, password);
  if (!username || !password) {
    res.status(400);
    throw new Error("Please Fill in all field");
  }
  //check User
  const User = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (!User) return res.sendStatus(401);

  if (User.rows[0] && (await bcrypt.compare(password, User.rows[0].password))) {
    const role = Object.values(User.rows[0].role).filter(Boolean);

    //console.log(User);
    res.cookie("jwt", refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      id: User.rows[0].id,
      username: User.rows[0].username,
      role: role,
      email: User.rows[0].email,
      accessToken: generateAccessToken(username, role),
    });

    //console.log("USER ROLE" + role);
  } else {
    res.status(401);
    throw new Error("Invalild Credential.");
  }
});

//REFRESH TOKEN
// @ GET auth/refreshToken
const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.status(401).json({ error: "Refresh token not provided" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const foundUser = await pool.query(
        "SELECT username, role FROM users WHERE username = $1",
        [decoded.username]
      );
      //console.log(" found user :: " + JSON.stringify(foundUser));
      if (!foundUser) return res.status(401).json("User NOT FOUND!");

      const username = decoded.username;
      const role = Object.values(foundUser.rows[0].role).filter(Boolean);

      // console.log("Name :: " + username);
      // console.log("ROLE :: " + role);
      const accessToken = generateAccessToken(username, role);

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
``;

//GET User
const getAllUsers = asyncHandler(async (req, res) => {
  const data = await pool.query("SELECT * FROM users");

  const users = data.rows[0];
  res.status(200).json({
    users,
  });
});

//GET User
const getUser = asyncHandler(async (req, res) => {
  const data = await pool.query(
    "SELECT id, username, email FROM users WHERE username = $1",
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
const generateAccessToken = (username, role) => {
  return jwt.sign(
    {
      UserInfo: {
        username: username,
        role: role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10s",
    }
  );
};

//GENERATE REFRESH TOKEN
const generateRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  refreshToken,
  logout,
};
