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
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white p-4 rounded-xl shadow mb-4">
      <div>
        <input
          type="text"
          placeholder="Goal Name"
          className="block w-full p-2 mb-2 border rounded"
          {...register("name", { required: "Goal name is required" })}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>
      <div>
        <input
          type="number"
          placeholder="Target Amount"
          className="block w-full p-2 mb-2 border rounded"
          {...register("targetAmount", { 
            required: "Target amount is required", 
            valueAsNumber: true,
            min: { value: 1, message: "Target amount must be at least 1" }
          })}
        />
        {errors.targetAmount && <p className="text-red-500 text-xs">{errors.targetAmount.message}</p>}
      </div>
      {initialData.id && (
        <div>
          <input
            type="number"
            placeholder="Current Saved Amount"
            className="block w-full p-2 mb-2 border rounded"
            {...register("savedAmount", { 
              valueAsNumber: true,
              min: { value: 0, message: "Saved amount cannot be negative" }
            })}
          />
          {errors.savedAmount && <p className="text-red-500 text-xs">{errors.savedAmount.message}</p>}
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="Category"
          className="block w-full p-2 mb-2 border rounded"
          {...register("category", { required: "Category is required" })}
        />
        {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
      </div>
      <div>
        <input
          type="date"
          className="block w-full p-2 mb-2 border rounded"
          {...register("deadline", { required: "Deadline is required" })}
        />
        {errors.deadline && <p className="text-red-500 text-xs">{errors.deadline.message}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData.name ? "Update Goal" : "Add Goal"}
      </button>
    </form>
  );
}
