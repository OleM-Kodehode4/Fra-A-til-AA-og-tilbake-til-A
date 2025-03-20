import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (credentials) => API.post("/auth/login", credentials);
export const getProfile = (token) =>
  API.get("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
