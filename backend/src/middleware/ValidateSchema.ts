import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ITask } from '../models/Task';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    };
};

export const Schemas = {
    task: {
        create: Joi.object<ITask>({
            title: Joi.string(),
            isDone: Joi.boolean()
        }),
        update: Joi.object<ITask>({
            title: Joi.string(),
            isDone: Joi.boolean()
        })
    }
};
