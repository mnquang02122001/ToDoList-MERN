import Task from '../models/Task';
import { Request, Response } from 'express';
export const TaskController = {
    getAllTasks: async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find();
            return res.status(200).json({
                metadata: {
                    total: tasks.length,
                    offset: 0,
                    limit: tasks.length
                },
                tasks
            });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    getTask: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.taskId;
            const task = await Task.findById(taskId);
            return res.status(200).json({ task });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    createTask: async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            await task.save();
            return res.status(200).json({
                message: 'successful',
                task
            });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    updateTask: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.taskId;
            const task = await Task.findByIdAndUpdate(taskId, { $set: req.body }, { new: true });
            return res.status(200).json({
                message: 'successful',
                task
            });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    deleteTask: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.taskId;
            await Task.findByIdAndDelete(taskId);
            return res.status(200).json({ message: 'successful' });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
};
