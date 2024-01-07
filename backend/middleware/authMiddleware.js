import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log("decoded", decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      //   console.log("req.user", req.user);
      next();
    } else {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as Admin" });
  }
};

export { protect, admin };
