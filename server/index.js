import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Website from "./models/Website.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import Stripe from "stripe";

dotenv.config();

/* ================= EXPRESS ================= */

const app = express();
app.use(cors());
app.use(express.json());

/* ================= OPENAI ================= */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* ================= STRIPE ================= */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ================= PATH ================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= UPLOADS ================= */

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

app.use("/uploads", express.static(uploadPath));

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

/* ================= USER MODEL ================= */

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    avatar: String,
    premium: { type: Boolean, default: false }
  })
);

/* ================= AUTH ================= */

const auth = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ msg: "No token" });

  try {

    const token = header.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();

  } catch {

    return res.status(401).json({ msg: "Invalid token" });

  }

};

/* ================= REGISTER ================= */

app.post("/api/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    const exists = await User.findOne({ email });

    if (exists)
      return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash
    });

    res.json({ msg: "Registered successfully" });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

/* ================= LOGIN ================= */

app.post("/api/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "User not found" });

    const ok = await bcrypt.compare(password, user.password);

    if (!ok)
      return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      name: user.name,
      premium: user.premium
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

/* ================= PROFILE ================= */

app.get("/api/profile", auth, async (req, res) => {

  const user = await User.findById(req.user.id).select("-password");

  res.json(user);

});

/* ================= CREATE SITE ================= */

app.post("/api/create-site", auth, async (req, res) => {

  try {

    const site = await Website.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(site);

  } catch {

    res.status(500).json({ msg: "Create site failed" });

  }

});

/* ================= USER SITES ================= */

app.get("/api/sites", auth, async (req, res) => {

  const sites = await Website.find({ userId: req.user.id });

  res.json(sites);

});

/* ================= GET SITE ================= */

app.get("/api/site/:id", async (req, res) => {

  try {

    const site = await Website.findById(req.params.id);

    if (!site)
      return res.status(404).json({ msg: "Site not found" });

    res.json(site);

  } catch {

    res.status(500).json({ msg: "Site load failed" });

  }

});

/* ================= AI GENERATE ================= */

app.post("/api/ai/generate", auth, async (req, res) => {

  try {

    const { idea } = req.body;

    if (!idea)
      return res.status(400).json({ msg: "Idea is required" });

    /* ================= AI PROMPT ================= */

    const prompt = `
Return ONLY JSON.

{
 "name": "",
 "type": "",
 "heroTitle": "",
 "heroSubtitle": "",
 "services": ["","",""],
 "about": "",
 "testimonials":[{"name":"","text":""}],
 "pricing":[{"plan":"","price":""}]
}

Create a professional business website for: ${idea}

Rules:
- Content must match the business idea
- Services must be realistic
- Hero title must be attractive
- About must describe the business
- Testimonials must sound real
- Pricing must be reasonable
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    let data = {};

    try {
      data = JSON.parse(completion.choices[0].message.content);
    } catch {
      data = {};
    }

    /* ================= SMART IMAGE SYSTEM ================= */

    const images = {
      gym: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
      fitness: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
      cafe: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      restaurant: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      travel: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      salon: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff"
    };

    const ideaLower = idea.toLowerCase();

    let heroImage = images.gym;

    for (const key in images) {
      if (ideaLower.includes(key)) {
        heroImage = images[key];
        break;
      }
    }

    /* ================= DEFAULT CONTENT ================= */

    const services = Array.isArray(data.services)
      ? data.services
      : ["Professional Service", "Customer Support", "Business Consulting"];

    const testimonials = Array.isArray(data.testimonials)
      ? data.testimonials
      : [
          { name: "John", text: "Amazing experience!" },
          { name: "Sarah", text: "Highly recommended." }
        ];

    const pricing = Array.isArray(data.pricing)
      ? data.pricing
      : [
          { plan: "Basic", price: "$10" },
          { plan: "Pro", price: "$25" }
        ];

    const gallery = [
      heroImage,
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348"
    ];

    /* ================= SAVE WEBSITE ================= */

    const site = await Website.create({

      userId: req.user.id,

      name: data.name || `${idea} Website`,

      type: data.type || idea,

      heroTitle: data.heroTitle || `Welcome to ${idea}`,

      heroSubtitle: data.heroSubtitle || "Your business starts here",

      heroImage,

      services,

      about: data.about || `Professional ${idea} business website.`,

      gallery,

      testimonials,

      pricing,

      theme: {
        primary: "#0f172a",
        secondary: "#1e293b",
        font: "Poppins"
      }

    });

    res.json(site);

  } catch (err) {

    console.log("AI ERROR:", err);

    res.status(500).json({ msg: "AI generation failed" });

  }

});

/* ================= DEMO PAYMENT ================= */

app.post("/api/demo-payment", auth, async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    user.premium = true;

    await user.save();

    res.json({ premium: true });

  } catch {

    res.status(500).json({ msg: "Payment failed" });

  }

});

/* ================= STRIPE PAYMENT ================= */

app.post("/api/payment/create-checkout-session", auth, async (req, res) => {

  try {

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "AI Builder Premium" },
            unit_amount: 5000
          },
          quantity: 1
        }
      ],

      mode: "payment",

      success_url: "http://localhost:3000/payment-success",

      cancel_url: "http://localhost:3000/dashboard"

    });

    res.json({ url: session.url });

  } catch {

    res.status(500).json({ msg: "Stripe payment failed" });

  }

});

/* ================= PAYMENT SUCCESS ================= */

app.post("/api/payment/success", auth, async (req, res) => {

  const user = await User.findById(req.user.id);

  user.premium = true;

  await user.save();

  res.json({ success: true });

});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});