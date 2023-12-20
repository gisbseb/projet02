import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const verifyJwt = (req, res, next) => {
  const { TOKEN_SECRET } = process.env;
  const { token } = req.cookies;

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }

    next();
  });
};
