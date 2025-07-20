import React from "react";
import { daysLeft } from "../utils/dateUtils";

export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  const warnings = [];
  const overdue = [];

  goals.forEach(goal => {
    const days = daysLeft(goal.deadline);
    if (days <= 30 && days >= 0 && goal.savedAmount < goal.targetAmount) {
      warnings.push(goal);
    }
    if (days < 0 && goal.savedAmount < goal.targetAmount) {
      overdue.push(goal);
    }
  });

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-3">📊 Overview</h2>
      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Total Saved:</strong> ${totalSaved.toLocaleString()}</p>
      <p><strong>Completed Goals:</strong> {completed}</p>
      <p><strong>Goals Near Deadline:</strong> {warnings.length}</p>
      <p><strong>Overdue Goals:</strong> {overdue.length}</p>
    </div>
  );
}
