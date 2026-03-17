# 🚀 AI Business Builder (SaaS Website Generator)

An AI-powered full-stack web application that allows users to generate complete business websites instantly by entering a simple idea (e.g., Gym, Cafe, Travel Agency).

Built with modern technologies like **React, Node.js, MongoDB, OpenAI, and Stripe**, this project simulates a real-world SaaS product similar to Wix AI / Durable AI.

---

## 🌟 Features

### 🤖 AI Website Generation

* Generate full websites from a single idea
* Includes:

  * Hero Section
  * Services
  * About Content
  * Testimonials
  * Pricing
  * Gallery Images

---

### 👤 Authentication System

* User registration & login
* Secure JWT-based authentication
* Password hashing using bcrypt

---

### 📊 Dashboard

* View all created websites
* Navigate to each website
* Edit website content
* Upgrade to premium

---

### 🎨 Dynamic Website Rendering

* Fully dynamic pages
* Section-based rendering (Hero, Services, Gallery)
* Theme system (colors + fonts)

---

### 🖼️ Smart Image System

* Auto-selects images based on business type
* Fallback images to prevent UI break

---

### 💳 Payment Integration

* Stripe Checkout integration
* Demo payment option (for testing)
* Premium feature unlock system

---

### 🛠️ Editor (Optional Feature)

* Edit website content dynamically
* Update sections in real-time

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS / Inline Styling

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### AI Integration

* OpenAI API (gpt-4o-mini)

### Payment

* Stripe API

### Others

* Multer (file upload)
* dotenv (environment variables)

---

## 📂 Project Structure

```
ai-business-builder/
│
├── client/          # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api.js
│
├── server/          # Node.js Backend
│   ├── models/
│   ├── uploads/
│   └── index.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/ai-business-builder.git
cd ai-business-builder
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_key
```

Run backend:

```
node index.js
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm start
```

---

## 💳 Stripe Test Card

Use this for testing payments:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: 123
```

---

## 🚀 Usage

1. Register/Login
2. Go to Dashboard
3. Click "Create Website"
4. Enter idea (e.g., "Gym")
5. AI generates full website
6. View or edit the site
7. Upgrade to premium for full features

---

## 🎯 Future Improvements

* Drag & Drop Website Editor
* Domain Publishing
* Hosting System
* AI Layout Generator
* Advanced Theme Customization
* Stripe Webhooks (auto premium activation)

---

## 📌 Project Type

👉 Full Stack AI SaaS Application
👉 Portfolio / Startup Level Project

---

## 👨‍💻 Author

**Samuvel**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
