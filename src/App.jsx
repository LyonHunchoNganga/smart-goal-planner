import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoalDetails from "./pages/GoalDetails";

export default function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">🎯 Smart Goal Planner</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goals/:id" element={<GoalDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
import React from "react";
import GoalList from "./components/GoalList";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";
import GoalForm from "./components/GoalForm"; 