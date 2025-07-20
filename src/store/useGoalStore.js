import create from "zustand";
import toast from "react-hot-toast";
import { getGoals, addGoal, deleteGoal, updateGoal } from "../api/goals";

// Flag to track if we've shown the localStorage fallback message
let fallbackMessageShown = false;

const useGoalStore = create((set) => ({
  goals: [],
  isLoading: false,
  fetchGoals: async () => {
    set({ isLoading: true });
    try {
      const goals = await getGoals();
      set({ goals, isLoading: false });
      
      // Show fallback message only once
      if (localStorage.getItem("smart-goal-planner-goals") && !fallbackMessageShown) {
        toast.success("Using local storage for data persistence");
        fallbackMessageShown = true;
      }
    } catch (error) {
      set({ isLoading: false });
      toast.error("Error loading goals");
    }
  },
  addGoal: async (newGoal) => {
    set({ isLoading: true });
    const addedGoal = await addGoal(newGoal);
    set({ isLoading: false });
    
    if (addedGoal) {
      set((state) => ({ goals: [...state.goals, addedGoal] }));
      toast.success("Goal added successfully!");
    } else {
      toast.error("Failed to add goal.");
    }
  },
  deleteGoal: async (id) => {
    set({ isLoading: true });
    const success = await deleteGoal(id);
    set({ isLoading: false });
    
    if (success) {
      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== id),
      }));
      toast.success("Goal deleted successfully!");
    } else {
      toast.error("Failed to delete goal.");
    }
  },
  updateGoal: async (updatedGoal) => {
    set({ isLoading: true });
    const goal = await updateGoal(updatedGoal);
    set({ isLoading: false });
    
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