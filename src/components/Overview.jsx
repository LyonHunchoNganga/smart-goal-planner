import useGoalStore from "../store/useGoalStore";
import { isPast, differenceInDays } from 'date-fns';

export default function Overview() {
  const { goals } = useGoalStore();

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + (goal.savedAmount || 0), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => (goal.savedAmount || 0) >= goal.targetAmount).length;
  const overdueGoals = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    return isPast(deadline) && (goal.savedAmount || 0) < goal.targetAmount;
  }).length;
  const warningGoals = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    const daysLeft = differenceInDays(deadline, new Date());
    return daysLeft <= 30 && daysLeft >= 0 && (goal.savedAmount || 0) < goal.targetAmount;
  }).length;

  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <div className="card mb-4">
      <h3 className="text-lg font-bold mb-2">Overview</h3>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Overall Progress</span>
          <span>{overallProgress}%</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
      
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
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {warningGoals > 0 && (
          <div className="text-center bg-yellow-100 p-2 rounded">
            <p className="text-lg font-bold text-yellow-700">{warningGoals}</p>
            <p className="text-xs text-yellow-700">Goals Due Soon</p>
          </div>
        )}
        {overdueGoals > 0 && (
          <div className="text-center bg-red-100 p-2 rounded">
            <p className="text-lg font-bold text-red-700">{overdueGoals}</p>
            <p className="text-xs text-red-700">Overdue Goals</p>
          </div>
        )}
      </div>
    </div>
  );
}
