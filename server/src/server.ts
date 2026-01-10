import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env in server/ and .env in root/
dotenv.config();
dotenv.config({ path: join(__dirname, '../../../.env') });

import { buildApp } from './app.js';



const start = async () => {
    try {
        const app = await buildApp();
        const port = parseInt(process.env.PORT || '8000');
        const host = process.env.HOST || '0.0.0.0';

        await app.listen({ port, host });
        console.log(`🚀 Server ready at http://${host}:${port}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();





