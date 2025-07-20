import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GoalForm from "../components/GoalForm";

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/goals/${id}`)
      .then(res => res.json())
      .then(data => setGoal(data));
  }, [id]);

  const handleUpdate = (updatedGoal) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal)
    })
    .then(() => navigate("/"));
  };

  return (
    goal && <GoalForm onSubmit={handleUpdate} initialData={goal} />
  );
}
import React from "react";
import { useParams, useNavigate } from "react-router-dom";  