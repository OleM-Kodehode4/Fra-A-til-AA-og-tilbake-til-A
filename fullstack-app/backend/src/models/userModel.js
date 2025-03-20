import sql from "mssql";

const UserModel = {
  async registerUser(userData) {
    const pool = await global.poolPromise;
    const result = await pool.request()
      .input('username', sql.VarChar, userData.username)
      .input('password', sql.VarChar, userData.password)
      .input('email', sql.VarChar, userData.email)
      .execute('sp_registerUser'); // Stored procedure for user registration
    return result.recordset[0];
  },

  async loginUser(username, password) {
    const pool = await global.poolPromise;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .execute('sp_loginUser'); // Stored procedure for user login
    return result.recordset[0];
  },

  async updateUser(userId, userData) {
    const pool = await global.poolPromise;
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .input('username', sql.VarChar, userData.username)
      .input('email', sql.VarChar, userData.email)
      .execute('sp_updateUser'); // Stored procedure for updating user profile
    return result.recordset[0];
  },

  async getUserById(userId) {
    const pool = await global.poolPromise;
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .execute('sp_getUserById'); // Stored procedure for getting user by ID
    return result.recordset[0];
  }
};

export default UserModel;