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
      return res.status(403).json({ message: "identifiants invalide" });
    }
    const pwdMatch = await bcrypt.compare(password, foundUser.password);
    if (!pwdMatch) {
      return res.status(403).json({ message: "identifiants invalide" });
    }

    const token = jwt.sign({ username: foundUser.username }, TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.status(200).json({ message: "Connexion réussie" });
  } catch (err) {
    return res.status(500).json({ message: "erreur serveur", err });
  }
};

const logout = () => {
  res.send("logout");
};

export default {
  login,
  logout,
};
