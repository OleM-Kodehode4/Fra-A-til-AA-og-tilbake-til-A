import express from "express";
import { config } from "dotenv";
import sql from "mssql"; // Importer mssql med default import
import jwt from "jsonwebtoken";

// Last inn miljøvariabler
config();

const app = express();

// Bruk express.json() for å parse JSON request body
app.use(express.json());

// Konfigurasjon av SQL Server-tilkobling
const poolPromise = new sql.ConnectionPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Brukes for å sikre tilkoblingen
    trustServerCertificate: true, // Kan være nødvendig for lokale utviklingsmiljøer
  },
}).connect();

// API-endepunkt for registrering av ny bruker
app.post("/api/user/create", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .input("Password", sql.NVarChar, password)
      .input("FirstName", sql.NVarChar, firstName)
      .input("LastName", sql.NVarChar, lastName)
      .execute("CreateUser");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while creating user");
  }
});

// API-endepunkt for innlogging
app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .input("Password", sql.NVarChar, password)
      .execute("LoginUser");

    if (result.recordset.length === 0) {
      return res.status(400).send("Invalid credentials");
    }

    const user = result.recordset[0];
    const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during login");
  }
});

// API-endepunkt for redigering av bruker
app.post("/api/user/edit", async (req, res) => {
  try {
    const { token, newFirstName, newLastName } = req.body;

    // Verifiser token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("UserID", sql.Int, userId)
      .input("NewFirstName", sql.NVarChar, newFirstName)
      .input("NewLastName", sql.NVarChar, newLastName)
      .execute("EditUser");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid or expired token");
    }
    res.status(500).send("Error while editing user");
  }
});

// Start serveren
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
