const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, "Becky1703", (err, decode) => {
    if (err) {
      res.send({
        message: "Auth failed. Token is not valid, please login.",
        status: 2,
      });
    }
    if (decode) {
      req.body.user = decode.userId;
      next();
    } else {
      res.send({
        message: "Auth failed. Token is not valid, please login.",
        status: 2,
      });
    }
  });
}

module.exports = { authenticator };