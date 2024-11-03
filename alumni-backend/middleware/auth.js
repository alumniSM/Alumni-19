import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Auth header:", authHeader);
    if (!authHeader) {
      throw new Error("No Authorization header");
    }
    const token = authHeader.replace("Bearer ", "");
    console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;
