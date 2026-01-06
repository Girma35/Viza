import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { adminOnly } from "../lib/middleware.js";
import { PostCategory } from "@prisma/client";

const PostRoute: FastifyPluginAsync = async (server: FastifyInstance) => {

  server.get<{
    Querystring: {
      category?: string;
      author?: string;
      search?: string;
    };
  }>('/posts', async (request) => {

    const { category, author, search } = request.query;

    // 1. GENERATE A UNIQUE COMPOSITE KEY
    // We combine ALL existing parameters to create a truly unique identifier.
    // Example: category=tech & search=ai  -->  "posts:cat:tech:search:ai"
    const keyParts = ['posts'];
    if (category) keyParts.push(`cat:${category}`);
    if (author) keyParts.push(`auth:${author}`);
    if (search) keyParts.push(`search:${search}`);

    // If no params, key is "posts:all"
    const cacheKey = keyParts.length === 1 ? 'posts:all' : keyParts.join(':');

    // 2. CHECK REDIS
    const cachedResult = await server.redis.get(cacheKey);

    if (cachedResult) {
      console.log(`⚡ CACHE HIT: ${cacheKey}`);
      return JSON.parse(cachedResult);
    }

    // 3. FETCH FROM DB
    console.log(`🐢 CACHE MISS: ${cacheKey}`);
    const posts = await server.prisma.post.findMany({
      where: {
        ...(category && { category: category as PostCategory }),
        ...(author && { authorName: author }),
        ...(search && {
          title: { contains: search, mode: 'insensitive' },
        }),
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`💾 SAVING to Redis: ${cacheKey}`);
    await server.redis.set(cacheKey, JSON.stringify(posts), 'EX', 60);

    return posts;
  });


  server.delete<{
    Params: { slug: string };
  }>('/posts/:slug', { preHandler: [adminOnly] }, async (request, reply) => {
    try {
      const { slug } = request.params;

      const post = await server.prisma.post.delete({
        where: { slug },
      });

      console.log(`🧹 Invalidating Redis cache: posts:all`);
      await server.redis.del('posts:all');

      return post;
    } catch (error: any) {
      server.log.error(error);
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Post not found', message: 'The manuscript you are trying to delete does not exist.' });
      }
      return reply.status(500).send({ error: 'Failed to delete post', message: error.message });
    }
  });

  server.put<{
    Params: { slug: string };
    Body: {
      slug: string;
      title: string;
      excerpt?: string;
      content?: string;

      category: PostCategory;
      authorName: string;
      authorAvatar?: string;
      image?: string;
      readingTime?: string;
      isFeatured?: boolean;
      isTrending?: boolean;
      publishedAt?: string;
    };
  }>('/posts/:slug', { preHandler: [adminOnly] }, async (request, reply) => {
    try {
      const { slug } = request.params;
      const data = request.body;

      // Ensure publishedAt is a proper Date object for Prisma
      // and handle boolean conversions if necessary (though axios usually sends booleans)
      const updateData = {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
        isFeatured: data.isFeatured,
        isTrending: data.isTrending,
      };

      const post = await server.prisma.post.update({
        where: { slug },
        data: updateData,
      });

      console.log(`🧹 Invalidating Redis cache: posts:all`);
      await server.redis.del('posts:all');

      return post;
    } catch (error: any) {
      server.log.error(error);
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Post not found', message: 'The manuscript you are trying to update does not exist.' });
      }
      return reply.status(500).send({ error: 'Failed to update post', message: error.message });
    }
  });



  server.get<{
    Params: { slug: string };
  }>('/posts/:slug', async (request, reply) => {

    const post = await server.prisma.post.findUnique({
      where: { slug: request.params.slug },
    });

    if (!post) {
      return reply.status(404).send({ message: 'Post not found' });
    }

    return post;
  });

  server.post<{
    Body: {
      slug: string;
      title: string;
      excerpt?: string;
      content?: string;

      category: PostCategory;
      authorName: string;
      authorAvatar?: string;
      image?: string;
      readingTime?: string;
      isFeatured?: boolean;
      isTrending?: boolean;
      publishedAt?: string;
    };
  }>('/posts', { preHandler: [adminOnly] }, async (request, reply) => {
    try {
      const data = request.body;

      // Ensure publishedAt is a proper Date object for Prisma
      const postData = {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      };

      const post = await server.prisma.post.create({
        data: postData,
      });

      // CACHE INVALIDATION: Clear the list so the new post shows up
      console.log("🧹 Invalidating Redis cache: posts:all");
      await server.redis.del('posts:all');

      return reply.status(201).send(post);
    } catch (error) {
      server.log.error(error);
      return reply.status(500).send({
        error: 'Failed to create post. Check server logs for details.',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
};

export default PostRoute;
