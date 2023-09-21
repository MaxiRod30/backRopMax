import jwt from "jsonwebtoken";

export const generateToken = (user , time = "300s") => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: time });
  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Not authenticated" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, credentials) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = credentials.user;
    next();
  });
};