import { useEffect, useState } from "react";
import api from "./api";


export default function Dashboard() {

if (!localStorage.getItem("token")) {
  window.location = "/login";
}

  const [sites, setSites] = useState([]);

  useEffect(() => {
    api.get("/api/sites")
      .then(res => setSites(res.data));
  }, []);

  return (
    <div className="container">

      <h1>My Websites</h1>

      {sites.length === 0 && <p>No websites yet.</p>}

      {sites.map(site => (
        <div key={site._id} className="card">

          <h3>{site.businessName}</h3>

          <p><b>Owner:</b> {site.ownerName}</p>

          <p>{site.description}</p>

        </div>
      ))}

    </div>
  );
}
