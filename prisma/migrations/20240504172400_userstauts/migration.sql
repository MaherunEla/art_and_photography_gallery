-- CreateEnum
CREATE TYPE "Userstatus" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "Signup" ADD COLUMN     "userstatus" "Userstatus" NOT NULL DEFAULT 'Active';
