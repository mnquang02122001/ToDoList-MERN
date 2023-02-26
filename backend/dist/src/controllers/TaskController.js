"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const Task_1 = __importDefault(require("../models/Task"));
exports.TaskController = {
    getAllTasks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tasks = yield Task_1.default.find();
            return res.status(200).json({
                metadata: {
                    total: tasks.length,
                    offset: 0,
                    limit: tasks.length,
                },
                tasks,
            });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
    getTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const taskId = req.params.taskId;
            const task = yield Task_1.default.findById(taskId);
            if (!task)
                return res.status(400).json({ message: 'Task is not existed' });
            return res.status(200).json({ task });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
    createTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const task = new Task_1.default(req.body);
            yield task.save();
            return res.status(200).json({
                message: 'successful',
                task,
            });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
    updateTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const taskId = req.params.taskId;
            const task = yield Task_1.default.findByIdAndUpdate(taskId, { $set: req.body }, { new: true });
            if (!task)
                return res.status(400).json({ message: 'Task is not existed' });
            return res.status(200).json({
                message: 'successful',
                task,
            });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
    deleteTask: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const taskId = req.params.taskId;
            const task = yield Task_1.default.findByIdAndDelete(taskId);
            if (!task)
                return res.status(400).json({ message: 'Task is not existed' });
            return res.status(200).json({ message: 'successful' });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
};
