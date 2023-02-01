import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDb from './database/db';
import TaskRouter from './routes/TaskRoute';
import { config } from './config/config';

//Connect to database
connectDb();

//Create a server
const app = express();
const PORT = config.server.port;
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});
app.get('/', (req, res, next) => {
    res.json({ message: 'Hello world' });
});
app.use('/api/v1', TaskRouter);
app.use((req, res, next) => {
    const error = new Error('Invalid request! No resource was found!');
    console.error(error);
    return res.status(404).json({ message: error.message });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
