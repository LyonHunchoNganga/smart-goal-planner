import { goals as initialGoals } from "./db.json";

const GOAL_KEY = "goals";

// Function to generate a unique ID
const generateCUID = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 9);
  return `c${timestamp}${randomPart}`;
};


function getGoals() {
  try {
    const goalsFromStorage = localStorage.getItem(GOAL_KEY);
    if (goalsFromStorage) {
      return JSON.parse(goalsFromStorage);
    }
    localStorage.setItem(GOAL_KEY, JSON.stringify(initialGoals));
    return initialGoals;
  } catch (error) {
    console.error("Error getting goals from local storage", error);
    return [];
  }
}

function addGoal(goal) {
  try {
    const currentGoals = getGoals();
    const newGoal = {
      ...goal,
      id: generateCUID(),
    };
    const updatedGoals = [...currentGoals, newGoal];
    localStorage.setItem(GOAL_KEY, JSON.stringify(updatedGoals));
    return newGoal;
  } catch (error) {
    console.error("Error adding goal to local storage", error);
    return null;
  }
}

function deleteGoal(id) {
  try {
    const currentGoals = getGoals();
    const updatedGoals = currentGoals.filter(goal => goal.id !== id);
    localStorage.setItem(GOAL_KEY, JSON.stringify(updatedGoals));
  } catch (error) {
    console.error("Error deleting goal from local storage", error);
  }
}

function updateGoal(updatedGoal) {
  try {
    const currentGoals = getGoals();
    const updatedGoals = currentGoals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    localStorage.setItem(GOAL_KEY, JSON.stringify(updatedGoals));
    return updatedGoal;
  } catch (error) {
    console.error("Error updating goal in local storage", error);
    return null;
  }
}

export { getGoals, addGoal, deleteGoal, updateGoal };