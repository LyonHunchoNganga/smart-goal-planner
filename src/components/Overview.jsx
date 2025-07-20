import { daysLeft } from "../utils/dateUtils";

export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  const warnings = goals.filter(goal => {
    const days = daysLeft(goal.deadline);
    return days <= 30 && days >= 0 && goal.savedAmount < goal.targetAmount;
  });

  const overdue = goals.filter(goal => {
    const days = daysLeft(goal.deadline);
    return days < 0 && goal.savedAmount < goal.targetAmount;
  });

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved.toLocaleString()}</p>
      <p>Completed Goals: {completed}</p>
      <p>Near Deadline: {warnings.length}</p>
      <p>Overdue: {overdue.length}</p>
    </div>
  );
}
import React from "react";
import Overview from "./Overview";