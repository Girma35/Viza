import Fastify from 'fastify';
import cors from '@fastify/cors';
import autoload from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import { auth, toFastifyHandler } from './lib/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });

  await app.register(cors, {
    origin: true, // Allow all origins for now to avoid blockers
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  });


  /* 
  app.all("/api/auth/*", (request, reply) => {
    return toFastifyHandler(auth)(request, reply);
  });
  */

  await app.register(autoload, {
    dir: join(__dirname, 'plugins'),
  });
  await app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  });

  return app;
}

