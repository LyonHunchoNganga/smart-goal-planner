#  SMART Goal Planner

A modern, responsive React application for managing your financial goals. Built with Vite, Tailwind CSS, and React Router, this application provides a seamless experience for tracking your savings and achieving your dreams.

---

## 🚀 Features

- ✅ **Goal Management**: Add, edit, and delete your financial goals with ease.
- 💰 **Progress Tracking**: Track your savings with `currentAmount` and `targetAmount`.
- 📊 **Visual Progress**: A visual progress bar helps you see how far you've come.
- 🏷️ **Categorization**: Organize your goals with categories, priorities, and statuses.
- 📝 **Notes**: Add notes to your goals for extra context and reminders.
- 💾 **Data Persistence**: Your data is saved in `localStorage`, so you can pick up where you left off.
- 🎨 **Modern UI**: A clean and modern user interface built with Tailwind CSS.
-  **Routing**: Seamless navigation powered by React Router.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-goal-planner.git
cd smart-goal-planner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:5173`.

### 4. (Optional) Run the JSON Server

For a more robust backend experience, you can use the included `json-server`.

```bash
npm run start:json-server
```

This will run a mock REST API at `http://localhost:3000/goals`. You will need to update the API calls in `src/api/goals.js` to use `fetch` instead of `localStorage`.

---

## 🧱 Folder Structure

```
smart-goal-planner/
├── src/
│   ├── api/
│   │   ├── db.json
│   │   └── goals.js
│   ├── assets/
│   ├── components/
│   │   ├── GoalCard.jsx
│   │   ├── GoalForm.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── EditGoal.jsx
│   │   └── ...
│   ├── store/
│   │   └── useGoalStore.js
│   ├── utils/
│   │   └── dateUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
└── tailwind.config.js
