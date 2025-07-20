import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import useGoalStore from "../store/useGoalStore";

export default function EditGoal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, updateGoal } = useGoalStore();
  const goalToEdit = goals.find((goal) => goal.id === (isNaN(parseInt(id)) ? id : parseInt(id)));

  const handleUpdateGoal = (updatedGoal) => {
    updateGoal({ ...goalToEdit, ...updatedGoal });
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Goal</h2>
      <GoalForm onSubmit={handleUpdateGoal} initialData={goalToEdit} />
    </div>
  );
}