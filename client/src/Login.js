import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        { email, password }
      );

      // ✅ STORE AUTH DATA
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] =
  `Bearer ${res.data.token}`;
      localStorage.setItem("premium", res.data.premium);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("avatar", res.data.avatar || "");

      alert("Login Successful 🚀");

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

return (
  <div className="center-page">

    <div className="glass card" style={{ width: "350px" }}>

      <h2 style={{ textAlign: "center" }}>Login</h2>

      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn"
        style={{ width: "100%", marginTop: "15px" }}
        onClick={handleLogin}
      >
        Login
      </button>

    </div>

  </div>
);
}

export default Login;
