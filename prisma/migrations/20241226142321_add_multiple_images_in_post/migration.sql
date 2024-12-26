/*
  Warnings:

  - The `imageurl` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "imageurl",
ADD COLUMN     "imageurl" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;
