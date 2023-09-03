/*
  Warnings:

  - You are about to drop the `bits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bits" DROP CONSTRAINT "bits_orderId_fkey";

-- DropForeignKey
ALTER TABLE "bits" DROP CONSTRAINT "bits_userId_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_transportId_fkey";

-- DropTable
DROP TABLE "bits";

-- DropTable
DROP TABLE "cars";

-- DropTable
DROP TABLE "orders";

-- DropEnum
DROP TYPE "Damage";
