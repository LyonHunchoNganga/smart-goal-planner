# 🎯 SMART Goal Planner

A modern, responsive React application for managing financial goals — built with Vite, Tailwind CSS, React Router, and a local JSON server backend.

---

## 🚀 Features

- ✅ Add, edit, and delete SMART goals
- 💰 Make deposits and track savings progress
- 📅 View deadlines and goal completion status
- ⚠️ Warnings for upcoming and overdue deadlines
- 📊 Overview dashboard showing total progress
- 💾 Data persistence using `json-server`
- 🎨 Styled using Tailwind CSS
- 🔁 Navigation via React Router

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-goal-planner.git
cd smart-goal-planner
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start the Development Server
bash
Copy
Edit
npm run dev
4. Start the JSON Server
bash
Copy
Edit
npm run start:json-server
This runs a mock REST API at http://localhost:3000/goals

🧱 Folder Structure
lua
Copy
Edit
smart-goal-planner/
├── db.json
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── GoalCard.jsx
│   │   ├── GoalForm.jsx
│   │   ├── DepositForm.jsx
│   │   └── Overview.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── EditGoal.jsx
│   └── utils/
│       └── dateUtils.js
