import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function CreateSite() {

  const navigate = useNavigate();

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [idea, setIdea] = useState("");

  const [form, setForm] = useState({
    name: "",
    type: ""
  });

  /* ================= PROTECT PAGE ================= */
  useEffect(() => {

    const checkAccess = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {

        const res = await api.get("/api/profile");

        if (!res.data.premium) {
          alert("🚫 Upgrade to Premium to create website");
          navigate("/dashboard");
          return;
        }

        setCheckingAccess(false);

      } catch {
        navigate("/login");
      }
    };

    checkAccess();

  }, [navigate]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };

  /* ================= AI GENERATE ================= */

  const generateWithAI = async () => {

    if (!idea.trim()) {
      alert("Please enter a business idea");
      return;
    }

    try {

      setLoadingAI(true);

      const res = await api.post("/api/ai/generate", { idea });

      const site = res.data;

      alert("Website Generated 🚀");

      // 🔑 REDIRECT TO GENERATED SITE
      navigate(`/site/${site._id}`);

    } catch (err) {

      console.log(err);
      alert(err.response?.data?.msg || "AI generation failed");

    } finally {

      setLoadingAI(false);

    }

  };

  /* ================= SUBMIT MANUAL ================= */

  const submit = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);

      const res = await api.post("/api/create-site", form);

      alert("Website Created 🚀");

      navigate(`/site/${res.data._id}`);

    } catch (err) {

      alert(err.response?.data?.msg || "Failed to create website");

    } finally {

      setSubmitting(false);

    }

  };

  /* ================= LOADING SCREEN ================= */

  if (checkingAccess)
    return <h2>Checking access...</h2>;

  /* ================= UI ================= */

  return (
    <div className="container">

      <h1>Create Website</h1>

      {/* AI IDEA */}

      <input
        placeholder="Enter your business idea (e.g. AI fitness app)"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <button onClick={generateWithAI} disabled={loadingAI}>

        {loadingAI ? "Generating..." : "✨ Generate with AI"}

      </button>

      <form onSubmit={submit}>

        <input
          name="name"
          value={form.name}
          placeholder="Business Name"
          onChange={handleChange}
          required
        />

        <input
          name="type"
          value={form.type}
          placeholder="Business Type"
          onChange={handleChange}
          required
        />

        <button disabled={submitting}>
          {submitting ? "Creating..." : "Create Website"}
        </button>

      </form>

    </div>
  );

}