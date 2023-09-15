const jwt = require("jsonwebtoken");
const { User } = require("../db");
require("dotenv").config();

const ensureToken = async(req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    return res.status(403).json({ error: "Token not provided" });
  }
  const [, bearerToken] = bearerHeader.split(" ");
  if (!bearerToken) {
    return res.status(403).json({ error: "Invalid token format" });
  }
  const { id } = jwt.verify(bearerToken, process.env.SECRET_KEY);
  const user = await User.findByPk(id);
  if(!user) {
    return res.status(403).json({ error: "Invalid token" });
  }
  req.user = bearerToken;
  next();
};

const onlyAdmin = async(req, res, next) => {
  const { role } = jwt.verify(req.user, process.env.SECRET_KEY);
  if(role !== "admin") return res.status(401).json({error: "Unauthorized"});
  next()
}

module.exports = {
  ensureToken,
  onlyAdmin,
};