const API_URL = "http://localhost:3000/goals";
const LOCAL_STORAGE_KEY = "smart-goal-planner-goals";
let useLocalStorage = false;

// Helper functions for localStorage
function getLocalGoals() {
  const goals = localStorage.getItem(LOCAL_STORAGE_KEY);
  return goals ? JSON.parse(goals) : [];
}

function saveLocalGoals(goals) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(goals));
  return goals;
}

// Check if API is available
async function checkApiAvailability() {
  try {
    const response = await fetch(API_URL, { method: 'HEAD', timeout: 1000 });
    useLocalStorage = !response.ok;
    return response.ok;
  } catch (error) {
    console.warn("API not available, using localStorage instead");
    useLocalStorage = true;
    return false;
  }
}

// Initialize by checking API availability
checkApiAvailability();

async function getGoals() {
  if (useLocalStorage) {
    return getLocalGoals();
  }
  
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch goals");
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting goals:", error);
    useLocalStorage = true;
    return getLocalGoals();
  }
}

async function addGoal(goal) {
  const newGoal = {
    ...goal,
    id: useLocalStorage ? String(Date.now()) : goal.id,
    savedAmount: goal.savedAmount || 0,
    createdAt: new Date().toISOString()
  };
  
  if (useLocalStorage) {
    const goals = getLocalGoals();
    goals.push(newGoal);
    saveLocalGoals(goals);
    return newGoal;
  }
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    });
    if (!response.ok) {
      throw new Error("Failed to add goal");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding goal:", error);
    useLocalStorage = true;
    return addGoal(goal); // Retry with localStorage
  }
}

async function deleteGoal(id) {
  if (useLocalStorage) {
    const goals = getLocalGoals();
    const filteredGoals = goals.filter(goal => goal.id !== id);
    saveLocalGoals(filteredGoals);
    return true;
  }
  
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete goal");
    }
    return true;
  } catch (error) {
    console.error("Error deleting goal:", error);
    useLocalStorage = true;
    return deleteGoal(id); // Retry with localStorage
  }
}

async function updateGoal(updatedGoal) {
  if (useLocalStorage) {
    const goals = getLocalGoals();
    const index = goals.findIndex(goal => goal.id === updatedGoal.id);
    if (index !== -1) {
      goals[index] = updatedGoal;
      saveLocalGoals(goals);
      return updatedGoal;
    }
    return null;
  }
  
  try {
    const response = await fetch(`${API_URL}/${updatedGoal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGoal),
    });
    if (!response.ok) {
      throw new Error("Failed to update goal");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating goal:", error);
    useLocalStorage = true;
    return updateGoal(updatedGoal); // Retry with localStorage
  }
}

export { getGoals, addGoal, deleteGoal, updateGoal };