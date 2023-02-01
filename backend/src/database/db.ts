import mongoose from 'mongoose';
import { config } from '../config/config';
const connectDb = async () => {
    try {
        await mongoose.connect(config.mongo.url);
        console.log('Connect to MongoDB successfully');
    } catch (error) {
        console.log(error);
    }
};
export default connectDb;
