import { sql, poolPromise } from "../config/db.js";

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT id, username FROM Users WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("username", sql.VarChar, username)
      .query("UPDATE Users SET username = @username WHERE id = @id");

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
