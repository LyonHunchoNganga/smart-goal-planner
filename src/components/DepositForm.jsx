import { useState } from "react";

export default function DepositForm({ goals, onDeposit }) {
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onDeposit(goalId, parseFloat(amount));
    setGoalId("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Make a Deposit</h2>
      <select
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      >
        <option value="">Select a Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Deposit
      </button>
    </form>
  );
}
