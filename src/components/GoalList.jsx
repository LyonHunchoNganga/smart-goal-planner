import GoalCard from "./GoalCard";

export default function GoalList({ goals, onDelete }) {
  return (
    <div>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </div>
  );
}
