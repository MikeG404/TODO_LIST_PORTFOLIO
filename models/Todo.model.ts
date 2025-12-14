import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
    title: string;
    isCompleted: boolean;
    createdAt: Date;
    user: string;
}

const TodoSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, "Add task title"],
        trim: true,
        maxLength: [50, "Task cannot must be 50 char or less"]
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true,
    }
)

const Todo = mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;