-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'InProgress', 'Deliverd', 'Cancel');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';
