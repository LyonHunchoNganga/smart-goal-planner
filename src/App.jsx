import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import GoalDetails from "./pages/GoalDetails";
import EditGoal from "./pages/EditGoal";

export default function App() {
  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">
             Smart Goal Planner
          </h1>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goals/:id" element={<GoalDetails />} />
          <Route path="/edit-goal/:id" element={<EditGoal />} />
        </Routes>
      </main>
    </div>
  );
}
