import React, { useEffect } from "react";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";
import useGoalStore from "../store/useGoalStore";

export default function Home() {
  const { goals, fetchGoals, addGoal, deleteGoal } = useGoalStore();

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return (
    <>
      <GoalForm onSubmit={addGoal} />
      <GoalList goals={goals} onDelete={deleteGoal} />
    </>
  );
}
