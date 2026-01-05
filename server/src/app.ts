import Fastify from 'fastify';
import cors from '@fastify/cors';
import autoload from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { auth, toFastifyHandler } from './lib/auth.js';

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
    origin: (origin, cb) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        process.env.CLIENT_URL
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
        return;
      }
      cb(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-bypass'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  });


  app.all("/api/auth/*", (request, reply) => {
    return toFastifyHandler(auth)(request, reply);
  });

  await app.register(autoload, {
    dir: join(__dirname, 'plugins'),
  });
  await app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  });

  return app;
}

