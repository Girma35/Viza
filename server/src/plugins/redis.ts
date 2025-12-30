import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Redis } from 'ioredis';

declare module 'fastify' {
    interface FastifyInstance {
        redis: Redis;
    }
}

const redisPlugin: FastifyPluginAsync = async (server: FastifyInstance) => {
    const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

    server.decorate('redis', redis);

    server.addHook('onClose', async (server) => {
        await server.redis.quit();
    });
};

export default fp(redisPlugin);
