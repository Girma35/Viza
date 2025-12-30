import { FastifyInstance, FastifyPluginAsync } from 'fastify';

const healthRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get('/health', async (request, reply) => {
        return { status: 'ok', timestamp: new Date().toISOString() };
    });

    server.get('/db-test', async (request, reply) => {
        try {
            // Test Prisma connection
            await server.prisma.$queryRaw`SELECT 1`;
            return { status: 'ok', message: 'Database connection is healthy' };
        } catch (error) {
            server.log.error(error);
            return reply.status(500).send({ status: 'error', message: 'Database connection failed' });
        }
    });
};

export default healthRoutes;
