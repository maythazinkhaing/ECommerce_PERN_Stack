const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const verifyJWT = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  //console.log("Auth :" + authHeader);
  if (!authHeader) return res.sendStatus(401);

  if (authHeader && authHeader.startsWith("Bearer")) {
    //console.log(authHeader);
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid
      req.user = decoded.username;
      next();
    });
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token.");
  }
});

module.exports = verifyJWT;
