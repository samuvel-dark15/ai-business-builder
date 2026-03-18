import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Gallery from "../components/sections/Gallery";

export default function SiteView() {

  const { id } = useParams();

  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD SITE ================= */

  useEffect(() => {

    const loadSite = async () => {

      try {

        console.log("Loading site:", id);

        const res = await api.get(`/api/site/${id}`);

        console.log("SITE DATA:", res.data);

        setSite(res.data);

      } catch (err) {

        console.error("Site load error:", err);

      } finally {

        setLoading(false);

      }

    };

    loadSite();

  }, [id]);



  /* ================= LOADING ================= */

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading website...
      </h2>
    );
  }

  if (!site) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Website not found
      </h2>
    );
  }



  /* ================= SAFE FALLBACK DATA ================= */

  const heroData = {
    title: site.heroTitle || "Welcome",
    subtitle: site.heroSubtitle || "Your business website",
    image: site.heroImage || "/1img.avif" // ✅ fallback added
  };

  const servicesData = Array.isArray(site.services) ? site.services : [];

  const galleryData = Array.isArray(site.gallery) ? site.gallery : [];



  /* ================= PAGE STYLE ================= */

  const pageStyle = {
    fontFamily: site?.theme?.font || "Arial",
    background: site?.theme?.secondary || "#0f172a",
    color: "white",
    minHeight: "100vh"
  };



  /* ================= RENDER ================= */

  return (

    <div style={pageStyle}>

      {/* ================= HERO ================= */}
      <Hero data={heroData} />



      {/* ================= SERVICES ================= */}
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Our Services</h2>

        <Services data={servicesData} />
      </div>



      {/* ================= GALLERY ================= */}
      <div style={{ padding: "60px" }}>
        <h2 style={{ textAlign: "center" }}>Gallery</h2>

        <Gallery data={galleryData} />
      </div>



      {/* ================= ABOUT ================= */}
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>About Us</h2>

        <p style={{ maxWidth: "700px", margin: "auto" }}>
          {site.about || "Professional business website"}
        </p>
      </div>



      {/* ================= FOOTER ================= */}
      <footer
        style={{
          background: "#111",
          color: "white",
          textAlign: "center",
          padding: "20px",
          marginTop: "40px"
        }}
      >
        © {new Date().getFullYear()} {site.name || "My Website"}
      </footer>

    </div>

  );
}