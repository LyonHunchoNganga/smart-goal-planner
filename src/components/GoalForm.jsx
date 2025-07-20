import { useState, useEffect } from "react";

export default function GoalForm({ onSubmit, initialData }) {
  const [goal, setGoal] = useState({
    title: "",
    description: "",
    progress: 0,
    deadline: "",
    ...initialData
  });

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goal);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md mb-4">
      <input type="text" name="title" value={goal.title} onChange={handleChange} placeholder="Goal Title" required className="block w-full p-2 mb-2 border rounded" />
      <textarea name="description" value={goal.description} onChange={handleChange} placeholder="Description" className="block w-full p-2 mb-2 border rounded" />
      <input type="number" name="progress" value={goal.progress} onChange={handleChange} placeholder="Progress (%)" min="0" max="100" className="block w-full p-2 mb-2 border rounded" />
      <input type="date" name="deadline" value={goal.deadline} onChange={handleChange} className="block w-full p-2 mb-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Goal</button>
    </form>
  );
}
import React from "react";  