import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Admin authentication has been disabled.
 * This middleware now allows all requests to pass through.
 */
export async function adminOnly(request: FastifyRequest, reply: FastifyReply) {
    // Protection removed as per user request.
    return;
}
