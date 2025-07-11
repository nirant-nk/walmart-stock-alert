import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

dotenv.config();

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res
    .status(400)
    .json({ message: "User already exists" });

    const user = await User.create({ username, password, role });
    res
    .status(201)
    .json({ message: "User registered", user: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
