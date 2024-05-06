/*
  Warnings:

  - You are about to drop the column `name` on the `Frame` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Frame` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `Frame` table. All the data in the column will be lost.
  - Added the required column `frameimage` to the `Frame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `framename` to the `Frame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Frame" DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "src",
ADD COLUMN     "frameimage" TEXT NOT NULL,
ADD COLUMN     "framename" TEXT NOT NULL,
ADD COLUMN     "frameprice" DOUBLE PRECISION;
