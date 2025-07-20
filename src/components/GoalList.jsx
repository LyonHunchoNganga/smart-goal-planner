import React from "react";
import GoalCard from "./GoalCard";

export default function GoalList({ goals, onDelete }) {
  if (!goals.length) {
    return (
      <p className="text-gray-600 text-center mt-8">
        No goals yet. Start by adding one!
      </p>
    );
  }

  return (
    <section className="space-y-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </section>
  );
}
