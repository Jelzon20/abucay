import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    // 🔄 Reset expiry (sliding expiration)
    const newToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send new token back
    res.setHeader("Authorization", `Bearer ${newToken}`);

    next();

  } catch (err) {
    return res.status(401).json({ error: "Token expired" });
  }
};