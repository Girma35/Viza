# Viza Backend (Fastify)

This is the Fastify backend for the Viza project.

## Tech Stack
- **Fastify**: High-performance web framework for Node.js.
- **Prisma**: Next-generation Node.js and TypeScript ORM.
- **PostgreSQL**: Relational database.
- **Redis**: In-memory data structure store, used for caching.
- **Zod**: TypeScript-first schema validation.

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Redis

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure environment variables:**
    Copy `.env` and update the values (especially `DATABASE_URL` and `REDIS_URL`).

3.  **Setup the database:**
    ```bash
    npm run prisma:migrate
    ```

4.  **Run in development mode:**
    ```bash
    npm run dev
    ```

## Project Structure
- `src/app.ts`: Fastify app configuration.
- `src/index.ts`: Entry point.
- `src/plugins/`: Custom Fastify plugins (Prisma, Redis, etc.).
- `src/routes/`: API routes.
- `prisma/`: Prisma schema and migrations.
