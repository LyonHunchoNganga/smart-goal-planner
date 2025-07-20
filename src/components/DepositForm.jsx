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
    <form onSubmit={handleSubmit(onFormSubmit)} className="card goal-form">
      <h3 className="text-lg font-bold mb-2">Make a Deposit</h3>
      <div className="form-group">
        <select
          className="input"
          {...register("goalId", { required: "Please select a goal" })}
          disabled={goals.length === 0}
        >
          <option value="">Select a Goal</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>{goal.name}</option>
          ))}
        </select>
        {errors.goalId && <p className="error-message">{errors.goalId.message}</p>}
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Amount"
          className="input"
          {...register("amount", { 
            required: "Amount is required", 
            valueAsNumber: true, 
            min: { value: 1, message: "Amount must be at least 1" } 
          })}
          disabled={goals.length === 0}
        />
        {errors.amount && <p className="error-message">{errors.amount.message}</p>}
      </div>
      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={goals.length === 0}
      >
        Deposit
      </button>
      {goals.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">Add a goal first to make deposits</p>
      )}
    </form>
  );
}
