import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { FastifyRequest, FastifyReply } from "fastify";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    trustedOrigins: [process.env.CLIENT_URL || "http://localhost:3000"],
});

type Auth = typeof auth;

export const toFastifyHandler = (auth: Auth) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const fullUrl = `${request.protocol}://${request.hostname}${request.url}`;
        const res = await auth.handler(
            new Request(fullUrl, {
                method: request.method,
                headers: new Headers(request.headers as any),
                body: request.method !== "GET" && request.method !== "HEAD" ? JSON.stringify(request.body) : undefined,
            })
        );

        reply.status(res.status);
        res.headers.forEach((value, key) => {
            reply.header(key, value);
        });

        return reply.send(await res.arrayBuffer());
    };
};
