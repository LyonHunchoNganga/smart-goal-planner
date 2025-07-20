import { Link } from "react-router-dom";

export default function GoalCard({ goal, onDelete }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl mb-4">
      <h2 className="text-xl font-semibold">{goal.title}</h2>
      <p className="text-sm text-gray-600">{goal.description}</p>
      <div className="my-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
        </div>
        <p className="text-xs mt-1">Progress: {goal.progress}%</p>
      </div>
      <p className="text-xs text-gray-400">Deadline: {goal.deadline}</p>
      <div className="flex gap-2 mt-3">
        <Link to={`/goals/${goal.id}`} className="text-blue-600 hover:underline">Edit</Link>
        <button onClick={() => onDelete(goal.id)} className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
}
import React from "react";  