// server.js
require("dotenv").config(); // Last inn .env-filen
import express from "express";
import { json } from "body-parser";
import { sign, verify } from "jsonwebtoken";
import poolPromise from "./db";

const app = express();
const port = 3000;

app.use(json());

// API-endepunkter
// 1. Opprett bruker
app.post("/api/user/create", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .input("Password", sql.NVarChar, password)
      .input("FirstName", sql.NVarChar, firstName)
      .input("LastName", sql.NVarChar, lastName)
      .execute("RegisterUser");
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// 2. Logg inn bruker og returner token
app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .input("Password", sql.NVarChar, password)
      .execute("LoginUser");

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sign(
      { userId: result.recordset[0].UserID },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

// 3. Rediger bruker
app.post("/api/user/edit", async (req, res) => {
  const { token, newFirstName, newLastName } = req.body;
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Token", sql.NVarChar, token)
      .input("NewFirstName", sql.NVarChar, newFirstName)
      .input("NewLastName", sql.NVarChar, newLastName)
      .execute("EditUser");

    if (result.returnValue === -1) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    if (result.returnValue === -2) {
      return res.status(401).json({ message: "Token expired" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error editing user:", err);
    res.status(500).json({ message: "Error editing user" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
