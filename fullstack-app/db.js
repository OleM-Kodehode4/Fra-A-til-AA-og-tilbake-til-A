// db.js
require("dotenv").config(); // Last inn .env-filen

import { ConnectionPool } from "mssql";

const config = {
  user: process.env.DB_USER, // Hent fra .env-filen
  password: process.env.DB_PASSWORD, // Hent fra .env-filen
  server: process.env.DB_SERVER, // Hent fra .env-filen
  database: process.env.DB_DATABASE, // Hent fra .env-filen
  options: {
    encrypt: true, // For Azure
    trustServerCertificate: true, // For lokal utvikling
  },
};

const poolPromise = new ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Database connected!");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit();
  });

export default poolPromise;
