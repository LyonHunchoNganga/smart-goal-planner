import useGoalStore from "../store/useGoalStore";

export default function Overview() {
  const { goals } = useGoalStore();

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + (goal.savedAmount || 0), 0);
  const completedGoals = goals.filter(goal => (goal.savedAmount || 0) >= goal.targetAmount).length;

  return (
    <div className="card mb-4">
      <h3 className="text-lg font-bold mb-2">Overview</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{totalGoals}</p>
          <p className="text-sm text-gray-500">Total Goals</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">${totalSaved.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Saved</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{completedGoals}</p>
          <p className="text-sm text-gray-500">Completed Goals</p>
        </div>
      </div>
    </div>
  );
}
