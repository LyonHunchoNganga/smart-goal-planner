import { useEffect, useState } from "react";
import GoalForm from "../components/GoalForm";
import DepositForm from "../components/DepositForm";
import Overview from "../components/Overview";
import GoalList from "../components/GoalList";

export default function Dashboard() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  function addGoal(newGoal) {
    const goalWithMeta = {
      ...newGoal,
      savedAmount: 0,
      createdAt: new Date().toISOString(),
    };
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goalWithMeta),
    }).then(() => setGoals([...goals, goalWithMeta]));
  }

  function deleteGoal(id) {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE",
    }).then(() => setGoals(goals.filter((g) => g.id !== id)));
  }

  function deposit(goalId, amount) {
    const goal = goals.find((g) => g.id === goalId);
    const updated = { ...goal, savedAmount: goal.savedAmount + amount };

    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updated.savedAmount }),
    }).then(() =>
      setGoals(goals.map((g) => (g.id === goalId ? updated : g)))
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Overview goals={goals} />
      <GoalForm onAdd={addGoal} />
      <DepositForm goals={goals} onDeposit={deposit} />
      <GoalList goals={goals} onDelete={deleteGoal} />
    </div>
  );
}
