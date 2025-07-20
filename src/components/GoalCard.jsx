import React from "react";
import { Link } from "react-router-dom";

export default function GoalCard({ goal, onDelete }) {
  const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <div className="card goal-card">
      <div className="goal-card-header">
        <div>
          <h2 className="goal-name">{goal.name}</h2>
          <p className="goal-category">Category: {goal.category}</p>
        </div>
        <div className="goal-details">
          <div className="goal-deadline">Deadline: {new Date(goal.deadline).toLocaleDateString()}</div>
          <div className="goal-tags">
            <span className={`tag tag-${goal.priority}`}>{goal.priority}</span>
            <span className={`tag tag-${goal.status}`}>{goal.status}</span>
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress > 10 && `${progress}%`}
        </div>
      </div>

      <div className="goal-finances">
        <p>Saved: <span className="amount-saved">${goal.currentAmount}</span></p>
        <p>Target: <span className="amount-target">${goal.targetAmount}</span></p>
        <p>Remaining: <span className="amount-remaining">${remaining}</span></p>
      </div>

      <div className="goal-actions">
        <Link to={`/edit-goal/${goal.id}`} className="btn btn-primary">Edit</Link>
        <button onClick={() => onDelete(goal.id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}
