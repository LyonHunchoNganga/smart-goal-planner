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
    <div className={`card goal-card ${isOverdue ? 'border-red-500' : ''} ${isWarning ? 'border-yellow-500' : ''}`}>
      <div className="goal-card-header">
        <div>
          <h2 className="goal-name">{goal.name}</h2>
          <p className="goal-category">Category: {goal.category}</p>
        </div>
        <div className="goal-details">
          <div className="goal-deadline">
            Deadline: {format(deadline, 'MM/dd/yyyy')}
            {daysLeft > 0 && <div className="text-xs text-gray-500">{daysLeft} days remaining</div>}
            {daysLeft === 0 && <div className="text-xs text-orange-500">Due today!</div>}
            {daysLeft < 0 && <div className="text-xs text-red-500">{Math.abs(daysLeft)} days overdue</div>}
          </div>
          <div className="goal-tags">
            {isOverdue && <span className="tag tag-high">OVERDUE</span>}
            {isWarning && !isOverdue && <span className="tag tag-medium">WARNING</span>}
            {progress === 100 && <span className="tag tag-completed">COMPLETED</span>}
            {!isOverdue && !isWarning && progress < 100 && <span className="tag tag-in-progress">IN PROGRESS</span>}
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        >
          {progress > 10 && `${progress}%`}
        </div>
      </div>

      <div className="goal-finances">
        <p>
          Saved: <span className="amount-saved">${goal.savedAmount.toLocaleString()}</span>
        </p>
        <p>
          Target: <span className="amount-target">${goal.targetAmount.toLocaleString()}</span>
        </p>
        <p>
          Remaining: <span className="amount-remaining">${remaining.toLocaleString()}</span>
        </p>
      </div>

      <div className="goal-actions">
        <Link to={`/edit-goal/${goal.id}`} className="btn btn-primary">Edit</Link>
        <button onClick={() => onDelete(goal.id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}
