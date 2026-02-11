import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import OpenAI from "openai";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Auth Middleware
const auth = (req, res, next) => {

  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET123");
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};


// MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

// Model
const WebsiteSchema = new mongoose.Schema({
  userId: String,
  businessName: String,
  ownerName: String,
  description: String,
  content: String
});

const Website = mongoose.model("Website", WebsiteSchema);

// User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", UserSchema);

// Create website
app.post("/api/create-site", auth, async (req, res) => {
  try {
    const { businessName, ownerName, description } = req.body;

const content = `
About:
${businessName} owned by ${ownerName}

Services:
${description}

Contact:
Email: example@gmail.com
Phone: 9999999999
`;


    const site = new Website({
      userId: req.userId,
      businessName,
      ownerName,
      description,
      content
    });

    await site.save();

    res.json(site);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sites
app.get("/api/sites", auth, async (req, res) => {
  const sites = await Website.find({ userId: req.userId });
  res.json(sites);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// Routes
// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash
    });

    await user.save();

    res.json({ msg: "Registered" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      "SECRET123",
      { expiresIn: "7d" }
    );

    res.json({ token, name: user.name });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      "SECRET123",
      { expiresIn: "7d" }
    );

    res.json({ token, name: user.name });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



