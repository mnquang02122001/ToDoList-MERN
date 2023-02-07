"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    isDone: { type: Boolean, required: true }
}, {
    versionKey: false
});
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.default = Task;
