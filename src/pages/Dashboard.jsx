import { useEffect } from "react";
import GoalForm from "../components/GoalForm";
import DepositForm from "../components/DepositForm";
import Overview from "../components/Overview";
import GoalList from "../components/GoalList";
import useGoalStore from "../store/useGoalStore";

export default function Dashboard() {
  const { goals, isLoading, fetchGoals, addGoal, deleteGoal } = useGoalStore();

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return (
    <div className="container">
      {isLoading ? (
        <div className="card text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading goals...</p>
        </div>
      ) : (
        <>
          <Overview />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GoalForm onSubmit={addGoal} />
            <DepositForm />
          </div>
          {goals.length > 0 ? (
            <GoalList goals={goals} onDelete={deleteGoal} />
          ) : (
            <div className="card text-center py-8 mt-4">
              <p className="text-gray-500">No goals found. Add your first goal above!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
