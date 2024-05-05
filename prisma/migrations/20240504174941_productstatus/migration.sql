-- CreateEnum
CREATE TYPE "Productstatus" AS ENUM ('Sale', 'Notsale');

-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "productstatus" "Productstatus" NOT NULL DEFAULT 'Notsale';
