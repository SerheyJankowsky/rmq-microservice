/*
  Warnings:

  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PurchaseState" AS ENUM ('Started', 'Waiting', 'Done', 'Canceled');

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- DropTable
DROP TABLE "subscriptions";

-- DropEnum
DROP TYPE "SubscriptionType";

-- CreateTable
CREATE TABLE "user_courese" (
    "id" TEXT NOT NULL,
    "purchase_state" "PurchaseState" NOT NULL DEFAULT 'Started',

    CONSTRAINT "user_courese_pkey" PRIMARY KEY ("id")
);
