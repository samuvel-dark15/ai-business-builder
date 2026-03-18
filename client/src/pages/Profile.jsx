import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get("/api/profile");

      setUser(res.data);

      setForm({
        name: res.data.name || "",
        password: "",
      });

      // ✅ sync premium with navbar
      localStorage.setItem("premium", res.data.premium ? "true" : "false");

    } catch {
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
      fetchProfile();
    }
  }, [navigate, fetchProfile]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE PROFILE ================= */
  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/api/profile", form);
      alert("Profile updated ✅");
      fetchProfile(); // refresh data
    } catch {
      alert("Update failed");
    }
  };

  /* ================= UPLOAD PHOTO ================= */
  const uploadPhoto = async (e) => {
    e.preventDefault();

    if (!photo) return alert("Select image");

    const data = new FormData();
    data.append("avatar", photo);

    try {
      const res = await api.post("/api/profile/avatar", data);

      setUser((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));

      alert("Photo uploaded ✅");
    } catch {
      alert("Upload failed");
    }
  };

  /* ================= DEMO UPGRADE ================= */
  const handleUpgrade = async () => {
    try {
      await api.post("/api/demo-payment");

      alert("🎉 You are now Premium!");

      localStorage.setItem("premium", "true");

      fetchProfile();
    } catch {
      alert("Upgrade failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>My Profile</h1>

      {/* ================= PLAN CARD ================= */}
      <div style={planCard}>
        <h3>Current Plan</h3>

        {user?.premium ? (
          <>
            <h2 style={{ color: "#22c55e" }}>👑 Premium</h2>
            <p>Unlimited website creation</p>
            <p>Priority support</p>
          </>
        ) : (
          <>
            <h2 style={{ color: "#f43f5e" }}>Free Plan</h2>
            <p>Limited features</p>

            <button onClick={handleUpgrade} className="btn">
              Upgrade to Premium 🚀
            </button>
          </>
        )}
      </div>

      {/* ================= PHOTO ================= */}
      <div style={{ marginBottom: "20px" }}>
        {user?.avatar ? (
          <img
            src={`http://localhost:5000${user.avatar}`}
            alt="Profile"
            width="120"
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <p>No Photo</p>
        )}

        <form onSubmit={uploadPhoto}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <button className="btn">Upload</button>
        </form>
      </div>

      {/* ================= EDIT FORM ================= */}
      <form className="form" onSubmit={submit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password"
        />

        <button className="btn">Save</button>
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const planCard = {
  background: "#020617",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "25px",
  color: "white",
  maxWidth: "400px",
};
