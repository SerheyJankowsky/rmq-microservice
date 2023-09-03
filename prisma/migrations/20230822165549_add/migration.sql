/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BAYER', 'SELLER', 'ROOT', 'ADMIN');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('FREE');

-- CreateEnum
CREATE TYPE "Damage" AS ENUM ('FRONT', 'BACK', 'DVS', 'ALL_SIDE');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "Role"[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "type" "SubscriptionType" NOT NULL DEFAULT 'FREE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "mark" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "yer" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "dvs_type" TEXT NOT NULL,
    "cylinders" INTEGER,
    "drive" TEXT,
    "transmission_type" TEXT NOT NULL,
    "color" TEXT,
    "color_hex" TEXT,
    "keys" BOOLEAN,
    "mileage" INTEGER NOT NULL,
    "vin_code" TEXT NOT NULL,
    "photo_dvs" TEXT[],
    "photo_for_side" TEXT[],
    "photo_vin_code" TEXT NOT NULL,
    "photo_salon" TEXT[],
    "photo_additional" TEXT[],
    "photo_document" TEXT[],
    "photo_damage" TEXT[],
    "start_price" INTEGER NOT NULL,
    "damage" "Damage",

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL,
    "transportId" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bits" (
    "id" TEXT NOT NULL,
    "bit_rate" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT,

    CONSTRAINT "bits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "orders_transportId_key" ON "orders"("transportId");

-- CreateIndex
CREATE UNIQUE INDEX "bits_id_key" ON "bits"("id");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bits" ADD CONSTRAINT "bits_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bits" ADD CONSTRAINT "bits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
