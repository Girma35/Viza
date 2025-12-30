import { FastifyInstance, FastifyPluginAsync } from "fastify";

const PostRoute: FastifyPluginAsync = async (server: FastifyInstance) => {

  server.get<{
    Querystring: {
      category?: string;
      author?: string;
      search?: string;
    };
  }>('/posts', async (request) => {

    const { category, author, search } = request.query;

    return server.prisma.post.findMany({
      where: {
        ...(category && { category }),
        ...(author && { authorName: author }),
        ...(search && {
          title: { contains: search, mode: 'insensitive' },
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
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
      category: string;
      authorName: string;
      authorAvatar?: string;
      image?: string;
      readingTime?: string;
      isFeatured?: boolean;
      isTrending?: boolean;
      publishedAt?: string;
    };
  }>('/posts', async (request, reply) => {
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
