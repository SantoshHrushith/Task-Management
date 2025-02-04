import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Incomplete", "Complete", "Pending"],
    default: "Incomplete",
  },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
