import { useEffect } from "react";
import GoalForm from "../components/GoalForm";
import DepositForm from "../components/DepositForm";
import Overview from "../components/Overview";
import GoalList from "../components/GoalList";
import useGoalStore from "../store/useGoalStore";

export default function Dashboard() {
  const { goals, fetchGoals, addGoal, deleteGoal } = useGoalStore();

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Overview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GoalForm onSubmit={addGoal} />
        <DepositForm />
      </div>
      <GoalList goals={goals} onDelete={deleteGoal} />
    </div>
  );
}
