import { useState } from "react";

export default function GoalForm({ onAdd }) {
  const [goal, setGoal] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  function handleChange(e) {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(goal);
    setGoal({ name: "", targetAmount: "", category: "", deadline: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Add New Goal</h2>
      <input
        name="name"
        placeholder="Goal Name"
        value={goal.name}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="targetAmount"
        type="number"
        placeholder="Target Amount"
        value={goal.targetAmount}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={goal.category}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        name="deadline"
        type="date"
        value={goal.deadline}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Goal
      </button>
    </form>
  );
}
