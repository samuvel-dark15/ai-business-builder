import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);

  // Protect page
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    api.get("/api/sites")
      .then(res => setSites(res.data))
      .catch(() => {
        alert("Failed to load websites");
      });
  }, []);

  return (
    <div className="container">

      <button onClick={logout} className="btn-logout">
        Logout
      </button>

      <h1>My Websites</h1>

      {sites.length === 0 && <p>No websites yet.</p>}

      {sites.map(site => (
        <div key={site._id} className="card">
          <h3>{site.name}</h3>
          <p>{site.type}</p>
        </div>
      ))}

    </div>
  );
}
