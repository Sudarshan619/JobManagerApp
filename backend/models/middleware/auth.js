const jwt = require("jsonwebtoken");
const User = require("../usermodule");

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  const jwt_secretkey = "sudarshan"; 

  try {
    const data = jwt.verify(token, jwt_secretkey);
    req.user = data.user;
    res.json(data);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = fetchUser;
