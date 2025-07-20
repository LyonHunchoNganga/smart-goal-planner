const API_URL = "/api/goals";
const STORAGE_KEY = "smart-goal-planner-goals";
let useLocalStorage = false;

// Helper functions for localStorage
function getLocalGoals() {
  const goals = localStorage.getItem(STORAGE_KEY);
  return goals ? JSON.parse(goals) : [];
}

function saveLocalGoals(goals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

// Check if the server is available
async function checkServerAvailability() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    
    const response = await fetch(API_URL, { 
      method: 'HEAD',
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.log("Server unavailable, using localStorage fallback");
    return false;
  }
}

// Initialize and check server availability
(async () => {
  // Force localStorage for now to ensure it works
  useLocalStorage = true;
  
  // If using localStorage and no data exists, initialize with sample data
  if (useLocalStorage && !localStorage.getItem(STORAGE_KEY)) {
    const sampleGoals = [
      {
        id: "1",
        name: "Travel Fund - Japan",
        targetAmount: 5000,
        savedAmount: 3200,
        category: "Travel",
        deadline: "2025-12-31",
        createdAt: "2024-01-15"
      },
      {
        id: "2",
        name: "Emergency Fund",
        targetAmount: 10000,
        savedAmount: 7500,
        category: "Emergency",
        deadline: "2026-06-30",
        createdAt: "2023-05-01"
      }
    ];
    saveLocalGoals(sampleGoals);
  }
})();

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
  if (useLocalStorage) {
    const goals = getLocalGoals();
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      savedAmount: 0,
      createdAt: new Date().toISOString()
    };
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
      body: JSON.stringify({
        ...goal,
        savedAmount: 0,
        createdAt: new Date().toISOString(),
      }),
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