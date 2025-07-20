import { useForm } from "react-hook-form";
import useGoalStore from "../store/useGoalStore";

export default function DepositForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { goals, updateGoal } = useGoalStore();

  const onFormSubmit = (data) => {
    const goalId = isNaN(parseInt(data.goalId)) ? data.goalId : parseInt(data.goalId);
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      const updatedGoal = {
        ...goal,
        savedAmount: (goal.savedAmount || 0) + Number(data.amount)
      };
      updateGoal(updatedGoal);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white p-4 rounded-xl shadow mb-4">
      <h3 className="text-lg font-bold mb-2">Make a Deposit</h3>
      <div>
        <select
          className="block w-full p-2 mb-2 border rounded"
          {...register("goalId", { required: "Please select a goal" })}
        >
          <option value="">Select a Goal</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>{goal.name}</option>
          ))}
        </select>
        {errors.goalId && <p className="text-red-500 text-xs">{errors.goalId.message}</p>}
      </div>
      <div>
        <input
          type="number"
          placeholder="Amount"
          className="block w-full p-2 mb-2 border rounded"
          {...register("amount", { required: "Amount is required", valueAsNumber: true, min: { value: 1, message: "Amount must be at least 1" } })}
        />
        {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Deposit
      </button>
    </form>
  );
}
