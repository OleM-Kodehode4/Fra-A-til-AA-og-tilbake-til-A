import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql, poolPromise } from "../config/db.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await poolPromise;
    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .query(
        "INSERT INTO Users (username, password) VALUES (@username, @password)"
      );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE username = @username");

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.recordset[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
