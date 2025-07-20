import { create } from "zustand";
import toast from "react-hot-toast";
import { getGoals, addGoal, deleteGoal, updateGoal } from "../api/goals";

const useGoalStore = create((set) => ({
  goals: [],
  fetchGoals: () => {
    const goals = getGoals();
    set({ goals });
  },
  addGoal: (newGoal) => {
    const addedGoal = addGoal(newGoal);
    if (addedGoal) {
      set((state) => ({ goals: [...state.goals, addedGoal] }));
      toast.success("Goal added successfully!");
    } else {
      toast.error("Failed to add goal.");
    }
  },
  deleteGoal: (id) => {
    deleteGoal(id);
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    }));
    toast.success("Goal deleted successfully!");
  },
  updateGoal: (updatedGoal) => {
    const goal = updateGoal(updatedGoal);
    if (goal) {
      set((state) => ({
        goals: state.goals.map((g) => (g.id === goal.id ? goal : g)),
      }));
      toast.success("Goal updated successfully!");
    } else {
      toast.error("Failed to update goal.");
    }
  },
}));

export default useGoalStore;