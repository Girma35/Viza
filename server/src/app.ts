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
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, // IMPORTANT: Allows cookies to be sent back and forth
  });

  // 1. THE AUTH BRIDGE: Hand over all /api/auth/* requests to Better-Auth
  app.all("/api/auth/*", (request, reply) => {
    return toFastifyHandler(auth)(request, reply);
  });

  // Plugins are loaded before routes
  await app.register(autoload, {
    dir: join(__dirname, 'plugins'),
  });

  // Automatically load all routes from the routes directory
  await app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  });

  return app;
}
