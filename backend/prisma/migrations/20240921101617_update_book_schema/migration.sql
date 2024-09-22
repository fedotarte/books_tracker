/*
  Warnings:

  - You are about to drop the column `priority` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "priority",
DROP COLUMN "rating",
DROP COLUMN "status",
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0;
