import { useState } from "react";

export default function GoalForm({ onSubmit, initialData = {} }) {
  const [goal, setGoal] = useState({
    name: initialData.name || "",
    targetAmount: initialData.targetAmount || "",
    savedAmount: initialData.savedAmount || 0,
    category: initialData.category || "",
    deadline: initialData.deadline || "",
    createdAt: initialData.createdAt || new Date().toISOString()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal(prev => ({
      ...prev,
      [name]: name === "targetAmount" ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goal);
    // Reset only if creating new
    if (!initialData.name) {
      setGoal({
        name: "",
        targetAmount: "",
        savedAmount: 0,
        category: "",
        deadline: "",
        createdAt: new Date().toISOString()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-4">
      <input
        type="text"
        name="name"
        value={goal.name}
        onChange={handleChange}
        placeholder="Goal Name"
        required
        className="block w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        name="targetAmount"
        value={goal.targetAmount}
        onChange={handleChange}
        placeholder="Target Amount"
        required
        className="block w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        name="category"
        value={goal.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="block w-full p-2 mb-2 border rounded"
      />
      <input
        type="date"
        name="deadline"
        value={goal.deadline}
        onChange={handleChange}
        required
        className="block w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData.name ? "Update Goal" : "Add Goal"}
      </button>
    </form>
  );
}

