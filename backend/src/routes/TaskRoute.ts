import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';

const router = Router();

router.get('/tasks/get', TaskController.getAllTasks);
router.get('/tasks/get/:taskId', TaskController.getTask);
router.post('/tasks/create', ValidateSchema(Schemas.task.create), TaskController.createTask);
router.put('/tasks/update/:taskId', ValidateSchema(Schemas.task.update), TaskController.updateTask);
router.delete('/tasks/delete/:taskId', TaskController.deleteTask);

export default router;
