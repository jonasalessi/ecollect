import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV?.trim() === 'test' ? '.env.test' : '.env'
});

export default process.env.DB_LOCATION;