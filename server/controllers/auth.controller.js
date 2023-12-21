import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const login = async (req, res) => {
  const { TOKEN_SECRET } = process.env;
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!foundUser) {
      return res
        .status(403)
        .json({ message: "identifiants invalide", className: "error" });
    }
    const pwdMatch = await bcrypt.compare(password, foundUser.password);
    if (!pwdMatch) {
      return res
        .status(403)
        .json({ message: "identifiants invalide", className: "error" });
    }

    const token = jwt.sign({ username: foundUser.username }, TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.status(200).json({
      message: `Bienvenue ${foundUser.username}`,
      className: "success",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "erreur serveur", className: "error", err });
  }
};

const logout = (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) return res.sendStatus(204);
  res.clearCookie("token");
  res.json({ message: "Cookie nettoyer" });
};

export default {
  login,
  logout,
};
