-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'artist');

-- CreateTable
CREATE TABLE "Upload" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',

    CONSTRAINT "Signup_pkey" PRIMARY KEY ("id")
);
