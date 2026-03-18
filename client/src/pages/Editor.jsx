import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function Editor() {

  const { id } = useParams();

  const [site, setSite] = useState(null);

  /* ================= LOAD SITE ================= */

  useEffect(() => {

    const loadSite = async () => {
      try {
        const res = await api.get(`/api/site/${id}`);
        setSite(res.data);
      } catch (err) {
        console.error("Failed to load site:", err);
      }
    };

    loadSite();

  }, [id]);


  /* ================= SAVE SITE ================= */

  const saveSite = async () => {
    try {
      await api.put(`/api/site/${id}`, site);
      alert("Website Saved Successfully 🚀");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save website");
    }
  };


  /* ================= LOADING ================= */

  if (!site) {
    return <h2 style={{ textAlign: "center" }}>Loading editor...</h2>;
  }


  /* ================= UI ================= */

  return (
    <div style={{ padding: 40 }}>

      <h1>Website Editor</h1>

      {/* SITE NAME */}
      <label>Site Name</label>
      <br />

      <input
        value={site.name || ""}
        onChange={(e) =>
          setSite({ ...site, name: e.target.value })
        }
      />

      <br /><br />


      {/* HERO TITLE */}
      <label>Hero Title</label>
      <br />

      <input
        value={site.heroTitle || ""}
        onChange={(e) =>
          setSite({ ...site, heroTitle: e.target.value })
        }
      />

      <br /><br />


      {/* HERO SUBTITLE */}
      <label>Hero Subtitle</label>
      <br />

      <input
        value={site.heroSubtitle || ""}
        onChange={(e) =>
          setSite({ ...site, heroSubtitle: e.target.value })
        }
      />

      <br /><br />


      {/* SAVE BUTTON */}
<button className="btn">Save Changes</button>
<button className="btn">Add Section</button>

    </div>
  );
}