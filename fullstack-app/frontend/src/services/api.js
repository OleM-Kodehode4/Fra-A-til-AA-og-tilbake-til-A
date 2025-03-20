import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL based on your backend configuration

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};