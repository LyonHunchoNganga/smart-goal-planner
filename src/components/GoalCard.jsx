export default function GoalCard({ goal, onDelete }) {
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;

  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="text-lg font-bold">{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount.toLocaleString()}</p>
      <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
      <p>Remaining: ${remaining.toLocaleString()}</p>
      <div className="w-full bg-gray-200 h-3 rounded mt-2 mb-2">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        onClick={() => onDelete(goal.id)}
        className="text-sm text-red-500 mt-2"
      >
        Delete
      </button>
    </div>
  );
}
