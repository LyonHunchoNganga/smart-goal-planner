import React from "react";
import GoalCard from "./GoalCard";

export default function GoalList({ goals, onDelete }) {
  return (
    <section className="space-y-4 mt-6">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </section>
  );
}
