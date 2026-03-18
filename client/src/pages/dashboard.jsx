import { useEffect, useState, useCallback } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [sites, setSites] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [sitesRes, userRes] = await Promise.all([
        api.get("/api/sites"),
        api.get("/api/profile"),
      ]);

      setSites(sitesRes.data);
      setUser(userRes.data);

      localStorage.setItem("premium", String(userRes.data.premium));
    } catch (err) {
      console.error(err);

      alert("Session expired. Please login again.");

      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [fetchData, navigate]);

  /* ================= STRIPE PAYMENT ================= */
  const handleUpgrade = async () => {
    try {
      const res = await api.post("/api/payment/create-checkout-session");

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  /* ================= UI ================= */
  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <h1 className="title">🚀 AI Website Builder</h1>

        {!user?.premium ? (
          <button onClick={handleUpgrade} className="btn">
            Upgrade 🚀
          </button>
        ) : (
          <span style={{ color: "#22c55e" }}>🌟 Premium</span>
        )}
      </div>

      {/* EMPTY STATE */}
      {sites.length === 0 ? (
        <div className="empty">
          <h2>No websites yet</h2>
        </div>
      ) : (

        /* GRID */
        <div className="grid">

          {sites.map((site) => (

            <div
              key={site._id}
              className="card"
              onClick={() => navigate(`/site/${site._id}`)}
            >

              {/* IMAGE */}
              <div
                className="card-img"
                style={{
                  backgroundImage: `url(${site.heroImage})`
                }}
              />

              {/* CONTENT */}
              <div className="card-body">

                <h3 className="card-title">{site.name}</h3>
                <p className="card-type">{site.type}</p>

                {/* ACTION BUTTONS */}
                <div className="actions">

                  <button
                    className="action-btn view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/site/${site._id}`);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="action-btn edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/editor/${site._id}`);
                    }}
                  >
                    Edit
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}