/*
  Warnings:

  - Added the required column `password` to the `Signup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Signup" ADD COLUMN     "password" TEXT NOT NULL;
