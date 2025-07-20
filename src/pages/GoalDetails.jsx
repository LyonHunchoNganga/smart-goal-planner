import React from "react";
import { useParams } from "react-router-dom";
import useGoalStore from "../store/useGoalStore";
import { daysLeft } from "../utils/dateUtils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GoalDetails() {
  const { id } = useParams();
  const { goals } = useGoalStore();
  const goal = goals.find((g) => g.id === parseInt(id));

  if (!goal) {
    return <div>Goal not found</div>;
  }

  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const data = [
    { name: 'Progress', saved: goal.savedAmount, target: goal.targetAmount },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">{goal.name}</h2>
      <p><strong>Category:</strong> {goal.category}</p>
      <p><strong>Target Amount:</strong> ${goal.targetAmount}</p>
      <p><strong>Saved Amount:</strong> ${goal.savedAmount}</p>
      <p><strong>Deadline:</strong> {goal.deadline}</p>
      <p><strong>Days Left:</strong> {daysLeft(goal.deadline)}</p>
      <div className="w-full bg-gray-200 rounded-full h-4 my-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="saved" fill="#8884d8" />
            <Bar dataKey="target" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
