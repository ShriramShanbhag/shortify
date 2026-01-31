import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const startServer = async () => {
    try {
        app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
   
}

startServer();