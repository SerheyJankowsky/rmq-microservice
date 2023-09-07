/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_courese` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_courese" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_courese_userId_key" ON "user_courese"("userId");

-- AddForeignKey
ALTER TABLE "user_courese" ADD CONSTRAINT "user_courese_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
