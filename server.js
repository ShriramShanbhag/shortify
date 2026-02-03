import dotenv from 'dotenv';
import app from './app.js';
import { testDBConnection } from './src/config/db.js';

dotenv.config();

const startServer = async () => {
    try {
        await testDBConnection()
        app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
   
}

startServer();