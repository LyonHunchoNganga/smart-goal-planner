const API_URL = "http://localhost:3000/goals";

async function getGoals() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch goals");
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting goals:", error);
    return [];
  }
}

async function addGoal(goal) {
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
    return null;
  }
}

async function deleteGoal(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete goal");
    }
  } catch (error) {
    console.error("Error deleting goal:", error);
  }
}

async function updateGoal(updatedGoal) {
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
    return null;
  }
}

export { getGoals, addGoal, deleteGoal, updateGoal };