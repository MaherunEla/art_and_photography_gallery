-- CreateEnum
CREATE TYPE "Stockstatus" AS ENUM ('Stock', 'OutofStock');

-- AlterTable
ALTER TABLE "Frame" ADD COLUMN     "stockstatus" "Stockstatus" NOT NULL DEFAULT 'Stock';
