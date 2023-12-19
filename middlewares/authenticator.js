const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      message: "Authentication failed. Token not provided.",
      status: 2,
    });
  }

  jwt.verify(token, "Becky1703", (err, decode) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).send({
        message: "Authentication failed. Token is not valid. Please login.",
        status: 2,
      });
    }

    if (!decode || !decode.userId) {
      console.error("Invalid token structure:", decode);
      return res.status(401).send({
        message: "Authentication failed. Invalid token structure. Please login.",
        status: 2,
      });
    }

    req.body.user = decode.userId;
    next();
  });
}

module.exports = { authenticator };
