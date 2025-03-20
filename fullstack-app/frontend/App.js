import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = async () => {
    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          salt: "randomSalt",
          firstName,
          lastName,
        }),
      });
      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (err) {
      setMessage("Error registering user");
    }
  };

  const loginUser = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) setToken(data.token);
      setMessage(data.message || data.error);
    } catch (err) {
      setMessage("Error logging in");
    }
  };

  const editUser = async () => {
    try {
      const response = await fetch("/api/user/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, firstName, lastName }),
      });
      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (err) {
      setMessage("Error editing user");
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
      <button onClick={loginUser}>Login</button>
      <button onClick={editUser}>Edit Profile</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
