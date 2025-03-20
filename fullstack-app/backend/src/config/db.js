import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

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

if (!global.poolPromise) {
  global.poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => pool)
    .catch((err) => {
      console.error("Database connection failed", err);
      throw err;
    });
}

export const poolPromiseGlobal = global.poolPromise;

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("✅ Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

export { sql, poolPromise };