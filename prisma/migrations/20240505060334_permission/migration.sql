-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('Accepted', 'Notaccepted');

-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "cimage" TEXT,
ADD COLUMN     "permission" "Permission" NOT NULL DEFAULT 'Notaccepted';
