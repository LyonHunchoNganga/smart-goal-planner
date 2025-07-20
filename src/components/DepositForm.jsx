import React, { useState } from "react";

export default function DepositForm({ goals, onDeposit }) {
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!goalId || isNaN(parsedAmount) || parsedAmount <= 0) return;

    onDeposit(goalId, parsedAmount);
    setGoalId("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card mb-6 space-y-4"
    >
      <h2 className="text-lg font-bold">💰 Make a Deposit</h2>

      <div>
        <label htmlFor="goal-select" className="block text-sm font-medium text-gray-600">
          Select Goal
        </label>
        <select
          id="goal-select"
          value={goalId}
          onChange={(e) => setGoalId(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a Goal --</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter deposit amount"
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Deposit Funds
      </button>
    </form>
  );
}


