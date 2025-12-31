import { FastifyRequest, FastifyReply } from "fastify";
import { auth } from "./auth.js";



export async function adminOnly(request: FastifyRequest, reply: FastifyReply) {
    console.log("🔍 Admin check for URL:", request.url);
    console.log("🔍 Headers received:", JSON.stringify(request.headers, null, 2));

    // 1. Check for Secret Bypass Key (Method 1)
    const bypassKey = request.headers['x-admin-bypass'];

    if (bypassKey) {
        // Cast to string since it could be an array of strings
        const keyString = Array.isArray(bypassKey) ? bypassKey[0] : bypassKey;

        if (keyString === process.env.ADMIN_BYPASS_KEY) {
            console.log("✅ Admin bypass key verified.");
            return; // Authorized!
        } else {
            console.log("❌ Admin bypass key mismatch.");
            console.log(`Received: [${keyString}]`);
            console.log(`Expected: [${process.env.ADMIN_BYPASS_KEY}]`);
        }
    } else {
        console.log("ℹ️ No admin bypass key provided in headers.");
    }

    // 2. Otherwise check for session (Method 2)
    const session = await auth.api.getSession({
        headers: new Headers(request.headers as any)
    });

    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session || session.user.email !== adminEmail) {
        return reply.status(403).send({
            error: "Unauthorized",
            message: "This action is reserved for the site owner."
        });
    }



}
