import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(400).json({
        error: "Unauthorized - no token provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ error: "Unauthorized - invalid token" });
    }

    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized - invalid token",
      });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({
        error: "user doesn't found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("something went wrong in protectRoute middleware: ", error);
    res.status(500).json({
      error: "internal server error in protect route controller",
    });
  }
};

export default protectRoute;
