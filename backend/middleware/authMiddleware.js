// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized" });
    }
  }
  if (!token) res.status(401).json({ error: "No token" });
};

module.exports = { protect };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.authMiddleware = (roles = []) => {
//   return async (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.userId);
//       if (!user || (roles.length && !roles.includes(user.role))) {
//         return res.status(403).json({ message: "Forbidden" });
//       }
//       req.user = user;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   };
// };
