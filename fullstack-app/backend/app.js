const express = require("express");
const sql = require("mssql");
require("dotenv").config();

const app = express();
app.use(express.json());

// Databasekonfigurasjon
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Endepunkt for å opprette bruker
app.post("/api/user/create", async (req, res) => {
  const { email, password, salt, firstName, lastName } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .input("Password", sql.NVarChar, password)
      .input("Salt", sql.NVarChar, salt)
      .input("FirstName", sql.NVarChar, firstName)
      .input("LastName", sql.NVarChar, lastName)
      .output("ErrorCode", sql.Int)
      .execute("RegisterUser");

    if (result.output.ErrorCode === 1) {
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endepunkt for å redigere bruker
app.post("/api/user/edit", async (req, res) => {
  const { token, firstName, lastName } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("Token", sql.NVarChar, token)
      .input("FirstName", sql.NVarChar, firstName)
      .input("LastName", sql.NVarChar, lastName)
      .output("ErrorCode", sql.Int)
      .execute("EditUser");

    if (result.output.ErrorCode === 1) {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start serveren
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
