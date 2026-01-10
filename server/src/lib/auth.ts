import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { FastifyRequest, FastifyReply } from "fastify";

if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not defined in the environment!");
}

const poolConfig: any = { connectionString: process.env.DATABASE_URL };

if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes(':') && !process.env.DATABASE_URL.includes('@')) {
    poolConfig.password = process.env.DATABASE_PASSWORD || process.env.POSTGRES_PASSWORD || '';
}

const pool = new pg.Pool(poolConfig);

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

        // 1. Get all headers from the Better-Auth response
        res.headers.forEach((value, key) => {
            if (key.toLowerCase() !== 'set-cookie') {
                reply.header(key, value);
            }
        });

        // 2. IMPORTANT: Extract and send cookies separately to avoid mangling
        // Use the modern getSetCookie() method to handle multiple cookies
        const setCookies = (res.headers as any).getSetCookie ? (res.headers as any).getSetCookie() : [];
        if (setCookies.length > 0) {
            reply.header('set-cookie', setCookies);
        }

        return reply.send(await res.arrayBuffer());
    };
};


