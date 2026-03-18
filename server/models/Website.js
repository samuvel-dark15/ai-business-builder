import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema({

  /* USER */
  userId: {
    type: String,
    required: true
  },

  /* BASIC INFO */
  name: String,
  type: String,

  /* HERO */
  heroTitle: String,
  heroSubtitle: String,
  heroImage: String,

  /* SERVICES */
  services: {
    type: [String],
    default: []
  },

  /* ABOUT */
  about: String,

  /* GALLERY */
  gallery: {
    type: [String],
    default: []
  },

  /* TESTIMONIALS */
  testimonials: {
    type: Array,
    default: []
  },

  /* PRICING */
  pricing: {
    type: Array,
    default: []
  },

  /* ⭐ THEME SYSTEM */
  theme: {
    primary: {
      type: String,
      default: "#0f172a"
    },
    secondary: {
      type: String,
      default: "#111827"
    },
    font: {
      type: String,
      default: "Arial"
    }
  },

  /* ⭐ FUTURE DYNAMIC SECTIONS */
  sections: {
    type: Array,
    default: []
  }

},
{
  timestamps: true
});

export default mongoose.model("Website", websiteSchema);