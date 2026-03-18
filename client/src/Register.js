import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const change = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/register", form);

      window.location = "/login?registered=true";

    } catch (err) {
      alert(err.response?.data?.msg || "Register error");
    }
  };

  return (
    <div className="center-page">
      <div className="glass card" style={{ width: "350px" }}>
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <form onSubmit={submit}>
          <input
            className="input"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={change}
          />

          <input
            className="input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
          />

          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={change}
          />

          <button
            className="btn"
            style={{ width: "100%", marginTop: "15px" }}
            type="submit"
          >
            Register
          </button>
        </form>

      </div>
    </div>
  );
}