import { useForm } from "react-hook-form";

export default function GoalForm({ onSubmit, initialData = {} }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData
  });

  const onFormSubmit = (data) => {
    // Ensure numbers are properly converted
    const formattedData = {
      ...data,
      targetAmount: Number(data.targetAmount),
      savedAmount: initialData.savedAmount !== undefined ? Number(initialData.savedAmount) : 0
    };
    
    onSubmit(formattedData);
    if (!initialData.name) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="card goal-form">
      <h3 className="text-lg font-bold mb-2">{initialData.id ? "Edit Goal" : "Add New Goal"}</h3>
      
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
            {...register("targetAmount", { 
              required: "Target amount is required", 
              valueAsNumber: true,
              min: { value: 1, message: "Target amount must be at least 1" }
            })}
          />
          {errors.targetAmount && <p className="error-message">{errors.targetAmount.message}</p>}
        </div>
        
        {initialData.id && (
          <div className="form-group">
            <input
              type="number"
              placeholder="Current Saved Amount"
              className="input"
              {...register("savedAmount", { 
                valueAsNumber: true,
                min: { value: 0, message: "Saved amount cannot be negative" }
              })}
            />
            {errors.savedAmount && <p className="error-message">{errors.savedAmount.message}</p>}
          </div>
        )}
        
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
      </div>
      
      <button type="submit" className="btn btn-primary">
        {initialData.name ? "Update Goal" : "Add Goal"}
      </button>
    </form>
  );
}
