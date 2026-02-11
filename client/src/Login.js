import { useState } from "react";
import axios from "axios";

export default function Login() {

const params = new URLSearchParams(window.location.search);

const registered = params.get("registered");

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const change = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      window.location = "/";

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container">

      <h1>Login</h1>
      
      {registered && (
  <p style={{ color: "#38bdf8" }}>
    Registration successful. Please login.
  </p>
)}


      <form className="form" onSubmit={submit}>

        <input
          name="email"
          placeholder="Email"
          onChange={change}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={change}
          required
        />

        <button className="btn">Login</button>

      </form>

    </div>
  );
}
