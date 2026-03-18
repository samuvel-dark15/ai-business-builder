import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/dashboard";
import CreateSite from "./CreateSite";
import Login from "./Login";
import Register from "./Register";
import Profile from "./pages/Profile";
import axios from "axios";
import SiteView from "./pages/SiteView";
import Editor from "./pages/Editor";
import PaymentSuccess from "./pages/PaymentSuccess";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [premium, setPremium] = useState(false);

  /* ================= SYNC AUTH STATE ================= */
  const syncAuth = () => {
    const token = localStorage.getItem("token");
    const isPremium = localStorage.getItem("premium") === "true";

    setLoggedIn(!!token);
    setPremium(isPremium);
  };

  useEffect(() => {
    syncAuth();

    // 🔥 auto update navbar when localStorage changes
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    syncAuth();
    navigate("/login");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div style={navStyle}>

        {loggedIn ? (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>

            {/* ⭐ PREMIUM ONLY CREATE */}
            {premium && (
              <Link to="/create" style={linkStyle}>Create</Link>
            )}

            <Link to="/profile" style={linkStyle}>Profile</Link>

            {/* 👑 PLAN STATUS */}
            {premium ? (
              <span style={premiumStyle}>👑 Premium</span>
            ) : (
              <Link to="/profile" style={upgradeStyle}>
                Upgrade 🚀
              </Link>
            )}

            <button onClick={logout} style={btnStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}

      </div>

      {/* ================= ROUTES ================= */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateSite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/site/:id" element={<SiteView />} />
        <Route path="/editor/:id" element={<Editor/>}/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </>
  );
}

/* ================= STYLES ================= */

const navStyle = {
  padding: "15px",
  background: "#020617",
  display: "flex",
  alignItems: "center",
};

const linkStyle = {
  marginRight: "20px",
  color: "#38bdf8",
  textDecoration: "none",
  fontWeight: "bold",
};

const btnStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "5px",
  marginLeft: "auto",
};

const premiumStyle = {
  color: "#22c55e",
  fontWeight: "bold",
  marginRight: "20px",
};

const upgradeStyle = {
  color: "#facc15",
  fontWeight: "bold",
  marginRight: "20px",
  textDecoration: "none",
};

export default App;