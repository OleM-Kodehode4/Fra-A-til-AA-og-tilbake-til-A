import sql from "mssql";
import { config } from "dotenv";

// Last inn miljøvariabler
config();

// Konfigurasjon av SQL Server-tilkobling
const poolPromise = new sql.ConnectionPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Brukes for å sikre tilkoblingen (spesielt i Azure)
    trustServerCertificate: true, // Kan være nødvendig for lokale utviklingsmiljøer
  },
}).connect();

// Eksporter poolen for bruk i andre moduler
export { poolPromise, sql };
