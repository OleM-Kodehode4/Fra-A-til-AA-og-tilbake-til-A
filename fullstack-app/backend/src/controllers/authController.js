import sql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { poolPromiseGlobal } from "../config/db.js";

dotenv.config();

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await poolPromiseGlobal;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.request()
      .input("Username", sql.VarChar, username)
      .input("Password", sql.VarChar, hashedPassword)
      .execute("sp_RegisterUser");

    res.status(201).json({ message: "User registered successfully", userId: result.recordset[0].UserId });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "User registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await poolPromiseGlobal;
    const result = await pool.request()
      .input("Username", sql.VarChar, username)
      .execute("sp_GetUserByUsername");

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.UserId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const pool = await poolPromiseGlobal;
    const result = await pool.request()
      .input("UserId", sql.Int, userId)
      .execute("sp_GetUserProfile");

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { username, password } = req.body;

  try {
    const pool = await poolPromiseGlobal;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.request()
      .input("UserId", sql.Int, userId)
      .input("Username", sql.VarChar, username)
      .input("Password", sql.VarChar, hashedPassword)
      .execute("sp_UpdateUserProfile");

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};