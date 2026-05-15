import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ message: "No token" });
  try {
    req.admin = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
