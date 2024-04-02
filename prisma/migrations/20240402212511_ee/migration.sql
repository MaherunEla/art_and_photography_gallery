/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ordernote` on the `Order` table. All the data in the column will be lost.
  - Added the required column `userdata` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "contact",
DROP COLUMN "name",
DROP COLUMN "ordernote",
ADD COLUMN     "userdata" JSONB NOT NULL;
