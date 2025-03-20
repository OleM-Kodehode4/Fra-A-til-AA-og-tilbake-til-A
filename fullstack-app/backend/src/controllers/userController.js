import { poolPromise } from '../config/db.js';

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Username', sql.VarChar, username)
      .input('Password', sql.VarChar, password)
      .input('Email', sql.VarChar, email)
      .execute('sp_RegisterUser'); // Assuming you have a stored procedure for registration

    res.status(201).json({ message: 'User registered successfully', userId: result.recordset[0].UserId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'User registration failed', error });
  }
};

export const editUserProfile = async (req, res) => {
  const { userId, username, email } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('UserId', sql.Int, userId)
      .input('Username', sql.VarChar, username)
      .input('Email', sql.VarChar, email)
      .execute('sp_EditUserProfile'); // Assuming you have a stored procedure for editing user profile

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Profile update failed', error });
  }
};

export const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('UserId', sql.Int, userId)
      .execute('sp_GetUserProfile'); // Assuming you have a stored procedure for getting user profile

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile', error });
  }
};