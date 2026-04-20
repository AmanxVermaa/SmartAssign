# 🧠 SmartAssign AI
    AI-powered Answer Evaluation System with Plagiarism & Similarity Detection
___
<p align="center">
  <img src="https://img.shields.io/badge/MERN-FullStack-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
</p>

---

## 🌟 Overview

**SmartAssign AI** is a modern AI-powered assignment evaluation system built using the **MERN stack**.

It allows teachers to:
- Upload student & teacher PDFs
- Automatically evaluate answers using AI
- Detect similarity & plagiarism
- View and manage evaluation history

---

## 🖼️ Screenshots

### 🏠 Dashboard
![Dashboard](./assets/dashboard.png)

### 📊 Evaluation History
![History](./assets/history.png)

---

## ✨ Features

- 🔐 JWT Authentication (Login/Signup)
- 📄 PDF Upload (Student + Teacher)
- 🤖 AI Evaluation Engine
- 📊 Score + Feedback + Similarity + Plagiarism
- 📜 Evaluation History Page
- 🔍 Filter (Min Score)
- 🔄 Sorting (High, Low, Latest, Oldest)
- ✏️ Edit & Override Scores
- 🗑 Delete Records
- 🎨 Modern Glassmorphism UI
- 🧑 Profile Avatar + Dropdown

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### AI / Processing
- PDF Parser
- Tesseract OCR (for handwritten PDFs)

---

## ⚙️ Installation

### 1️⃣ Clone Repo
```bash
git clone https://github.com/your-username/smartassign-ai.git
cd smartassign-ai
2️⃣ Backend Setup
cd backend
npm install
npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔐 Environment Variables

Create .env file in backend:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
🚀 Usage
Signup / Login
Upload Student & Teacher PDF
Click Evaluate 🚀
View Results
Manage in History Page
📁 Project Structure
SmartAssign/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── utils/

🔮 Future Enhancements:-
📊 Analytics Dashboard (charts & stats)
🧠 Advanced NLP Evaluation
☁️ AWS Deployment (EC2 + S3)
📈 Performance Insights
👥 Multi-user Roles (Admin/Teacher)
👨‍💻 Author

Aman Verma

💼 Aspiring AWS DevOps Engineer
🚀 MERN + AI Enthusiast
⭐ Show Your Support

If you like this project:

⭐ Star this repo
🍴 Fork it
🧠 Contribute ideas
📜 License

This project is licensed under the MIT License.