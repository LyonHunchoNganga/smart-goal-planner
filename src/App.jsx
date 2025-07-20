import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoalDetails from "./pages/GoalDetails";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎯 Smart Goal Planner</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goals/:id" element={<GoalDetails />} />
      </Routes>
    </div>
  );
}
