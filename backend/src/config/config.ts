import dotenv from 'dotenv';

dotenv.config();

const SEVER_PORT = process.env.SERVER_PORT || 5000;
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const NODE_ENV = process.env.NODE_ENV || 'dev';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.bxtdprj.mongodb.net/${NODE_ENV}?retryWrites=true&w=majority`;
export const config = {
    server: {
        port: SEVER_PORT
    },
    mongo: {
        url: MONGO_URL
    }
};
