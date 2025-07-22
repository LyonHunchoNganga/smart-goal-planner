import React from "react";
import { useParams, Link } from "react-router-dom";
import useGoalStore from "../store/useGoalStore";
import { daysLeft } from "../utils/dateUtils";
import { format, isPast, differenceInDays } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GoalDetails() {
  const { id } = useParams();
  const { goals } = useGoalStore();
  const goal = goals.find((g) => g.id === (isNaN(parseInt(id)) ? id : parseInt(id)));

  if (!goal) {
    return (
      <div className="card text-center py-8">
        <h2 className="text-xl font-bold mb-4">Goal not found</h2>
        <p className="mb-4">The goal you're looking for doesn't exist or has been deleted.</p>
        <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  const progress = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
  const remaining = goal.targetAmount - goal.savedAmount;
  const deadline = new Date(goal.deadline);
  const days = differenceInDays(deadline, new Date());
  const isOverdue = isPast(deadline) && progress < 100;
  const isWarning = days <= 30 && days >= 0 && progress < 100;
  const isCompleted = progress >= 100;
  
  const data = [
    { name: 'Current', saved: goal.savedAmount, remaining: remaining },
  ];

  return (
    <div className="container">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Dashboard
      </Link>
      
      <div className="card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{goal.name}</h2>
            <p className="text-gray-500">Created on {format(new Date(goal.createdAt), 'MMM dd, yyyy')}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">${goal.targetAmount.toLocaleString()}</div>
            <p className="text-gray-500">Target Amount</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Goal Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium">{goal.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p>
                    {isCompleted && <span className="tag tag-completed">COMPLETED</span>}
                    {isOverdue && <span className="tag tag-high">OVERDUE</span>}
                    {isWarning && !isOverdue && <span className="tag tag-medium">DUE SOON</span>}
                    {!isCompleted && !isOverdue && !isWarning && <span className="tag tag-in-progress">IN PROGRESS</span>}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Deadline</p>
                  <p className="font-medium">{format(deadline, 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-gray-500">Time Remaining</p>
                  <p className={`font-medium ${isOverdue ? 'text-red-600' : isWarning ? 'text-yellow-600' : ''}`}>
                    {days > 0 && `${days} days left`}
                    {days === 0 && 'Due today!'}
                    {days < 0 && `${Math.abs(days)} days overdue`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Financial Progress</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500">Saved Amount</p>
                  <p className="font-medium text-green-600">${goal.savedAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Remaining</p>
                  <p className="font-medium text-yellow-600">${remaining.toLocaleString()}</p>
                </div>
              </div>
              
              <p className="text-sm mb-1 flex justify-between">
                <span>Progress</span>
                <span>{progress}%</span>
              </p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Visualization</h3>
          <div className="bg-gray-50 p-4 rounded-lg" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar name="Saved Amount" dataKey="saved" fill="#10b981" />
                <Bar name="Remaining" dataKey="remaining" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Link to={`/edit-goal/${goal.id}`} className="btn btn-primary">Edit Goal</Link>
        </div>
      </div>
    </div>
  );
}
