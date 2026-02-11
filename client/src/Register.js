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
try{
    await axios.post("http://localhost:5000/api/register", form);
     window.location = "/login?registered=true";

  window.location = "/login";

} catch (err) {
  alert(err.response.data.msg || "Register error");
}
  }
  return (
    <div className="container">

      <h1>Register</h1>

      <form className="form" onSubmit={submit}>

        <input name="name" placeholder="Name" onChange={change} />

        <input name="email" placeholder="Email" onChange={change} />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={change}
        />

        <button className="btn">Register</button>

      </form>

    </div>
  );
}
