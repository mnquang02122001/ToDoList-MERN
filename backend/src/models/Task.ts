import { Schema, model } from 'mongoose';

export interface ITask {
    title: string;
    isDone: boolean;
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        isDone: { type: Boolean, required: true }
    },
    {
        versionKey: false
    }
);

const Task = model<ITask>('Task', taskSchema);
export default Task;
