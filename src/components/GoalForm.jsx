import { useForm } from "react-hook-form";

export default function GoalForm({ onSubmit, initialData = {} }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData
  });

  const onFormSubmit = (data) => {
    const goalData = {
      ...data,
      currentAmount: initialData.currentAmount || 0,
      status: initialData.status || "in-progress",
      createdAt: initialData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(goalData);
    if (!initialData.name) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="card goal-form">
      <div className="form-grid">
        <div className="form-group">
          <input
            type="text"
            placeholder="Goal Name"
            className="input"
            {...register("name", { required: "Goal name is required" })}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Target Amount"
            className="input"
            {...register("targetAmount", { required: "Target amount is required", valueAsNumber: true })}
          />
          {errors.targetAmount && <p className="error-message">{errors.targetAmount.message}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Category"
            className="input"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="error-message">{errors.category.message}</p>}
        </div>
        <div className="form-group">
          <input
            type="date"
            className="input"
            {...register("deadline", { required: "Deadline is required" })}
          />
          {errors.deadline && <p className="error-message">{errors.deadline.message}</p>}
        </div>
        <div className="form-group">
          <select
            className="input"
            {...register("priority", { required: "Priority is required" })}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="error-message">{errors.priority.message}</p>}
        </div>
        <div className="form-group full-width">
          <textarea
            placeholder="Notes"
            className="input"
            {...register("notes")}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData.name ? "Update Goal" : "Add Goal"}
      </button>
    </form>
  );
}

