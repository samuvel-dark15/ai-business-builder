import { useState } from "react";
import api from "./api";

export default function CreateSite() {

if (!localStorage.getItem("token")) {
  window.location = "/login";
}

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    description: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();

   await api.post("/api/create-site", form);

    alert("Website Created!");
    window.location = "/";
  };

  return (
    <div className="container">

      <h1>Create Website</h1>

      <form className="form" onSubmit={submit}>

        <input
          name="businessName"
          placeholder="Business Name"
          onChange={handleChange}
          required
        />

        <input
          behavioral
          name="ownerName"
          placeholder="Owner Name"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Describe your business"
          rows="5"
          onChange={handleChange}
          required
        />

        <button className="btn">Create</button>

      </form>

    </div>
  );
}
