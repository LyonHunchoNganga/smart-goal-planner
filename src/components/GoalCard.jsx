import React from "react";
import { Link } from "react-router-dom";
import { format, differenceInDays, isPast } from 'date-fns';

export default function GoalCard({ goal, onDelete }) {
  const progress = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
  const remaining = goal.targetAmount - goal.savedAmount;
  const deadline = new Date(goal.deadline);
  const daysLeft = differenceInDays(deadline, new Date());
  const isOverdue = isPast(deadline) && progress < 100;
  const isWarning = daysLeft <= 30 && progress < 100;

  return (
    <div className={`card mb-6 ${isOverdue ? 'border-red-500' : ''} ${isWarning ? 'border-yellow-500' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-gray-800">{goal.name}</h2>
          <p className="text-sm text-gray-500 mb-3">Category: {goal.category}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 mb-1">Deadline: {format(deadline, 'MM/dd/yyyy')}</div>
          {isOverdue && <span className="text-red-500 text-xs font-bold">OVERDUE</span>}
          {isWarning && !isOverdue && <span className="text-yellow-500 text-xs font-bold">WARNING</span>}
        </div>
      </div>

      <div className="w-full bg-gray-200 h-4 rounded-full mb-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full text-xs font-medium text-white text-center p-0.5 leading-none"
          style={{ width: `${progress}%` }}
        >
          {progress > 10 && `${progress}%`}
        </div>
      </div>

      <div className="flex justify-between text-sm mb-4">
        <p>
          Saved: <span className="font-bold text-green-600">${goal.savedAmount}</span>
        </p>
        <p>
          Target: <span className="font-semibold">${goal.targetAmount}</span>
        </p>
      </div>
      <p className="text-sm text-yellow-600 mb-4">
        Remaining: ${remaining}
      </p>

      <div className="flex justify-end space-x-3 mt-4">
        <Link to={`/edit-goal/${goal.id}`} className="btn btn-primary">Edit</Link>
        <button onClick={() => onDelete(goal.id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}
