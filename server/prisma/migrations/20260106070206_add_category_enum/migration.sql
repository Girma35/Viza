/*
  Warnings:

  - Changed the type of `category` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('TECH_NEWS', 'LEARNING', 'ROAD_MAPS', 'SAAS');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "category",
ADD COLUMN     "category" "PostCategory" NOT NULL;
