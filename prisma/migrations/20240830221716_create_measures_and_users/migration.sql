-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "measures" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "type" "MeasureType" NOT NULL,
    "image_url" TEXT,
    "image" TEXT NOT NULL,
    "confirmed_at" TIMESTAMPTZ(3),
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
