import { useEffect, useState } from "react";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";

export default function Home() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  const handleAddGoal = (newGoal) => {
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
    .then(res => res.json())
    .then(data => setGoals([...goals, data]));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE"
    }).then(() => setGoals(goals.filter(goal => goal.id !== id)));
  };

  return (
    <>
      <GoalForm onSubmit={handleAddGoal} />
      <GoalList goals={goals} onDelete={handleDelete} />
    </>
  );
}
import React from "react";
import GoalForm from "../components/GoalForm";  