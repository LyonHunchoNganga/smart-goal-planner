import GoalCard from "./GoalCard";

export default function GoalList({ goals, onDelete }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </div>
  );
}
