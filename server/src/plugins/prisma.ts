import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

const prismaPlugin: FastifyPluginAsync = async (server: FastifyInstance) => {
    let connectionString = process.env.DATABASE_URL;

    // Ensure the connection string has a password
    if (connectionString) {
        try {
            const url = new URL(connectionString);
            // If password is missing from URL, add it from env vars
            if (!url.password) {
                const password = process.env.POSTGRES_PASSWORD || process.env.DATABASE_PASSWORD || '';
                url.password = password;
                connectionString = url.toString();
                server.log.info('Added password from environment to connection string');
            }
        } catch (e) {
            server.log.warn('Failed to parse DATABASE_URL, using as-is');
        }
    } else {
        server.log.error('DATABASE_URL is not set');
        throw new Error('DATABASE_URL environment variable is required');
    }

    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        await prisma.$connect();
        server.log.info('Connected to PostgreSQL');
    } catch (err) {
        server.log.error(err, 'Failed to connect to PostgreSQL');
        throw err;
    }

    server.decorate('prisma', prisma);

    server.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
        await pool.end();
    });
};

export default fp(prismaPlugin);
