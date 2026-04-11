import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Look for the admin in the "Admin" table
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    // 2. Compare the plain text password with the hashed one in DB
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // 3. Generate a JWT Token for security
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
