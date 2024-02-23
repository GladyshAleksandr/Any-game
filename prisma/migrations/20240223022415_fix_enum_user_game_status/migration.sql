/*
  Warnings:

  - You are about to drop the `_Beaten` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Dropped` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Playing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ToPlay` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PLAYING', 'BEATEN', 'DROPPED', 'TO_PLAY');

-- DropForeignKey
ALTER TABLE "_Beaten" DROP CONSTRAINT "_Beaten_A_fkey";

-- DropForeignKey
ALTER TABLE "_Beaten" DROP CONSTRAINT "_Beaten_B_fkey";

-- DropForeignKey
ALTER TABLE "_Dropped" DROP CONSTRAINT "_Dropped_A_fkey";

-- DropForeignKey
ALTER TABLE "_Dropped" DROP CONSTRAINT "_Dropped_B_fkey";

-- DropForeignKey
ALTER TABLE "_Playing" DROP CONSTRAINT "_Playing_A_fkey";

-- DropForeignKey
ALTER TABLE "_Playing" DROP CONSTRAINT "_Playing_B_fkey";

-- DropForeignKey
ALTER TABLE "_ToPlay" DROP CONSTRAINT "_ToPlay_A_fkey";

-- DropForeignKey
ALTER TABLE "_ToPlay" DROP CONSTRAINT "_ToPlay_B_fkey";

-- DropTable
DROP TABLE "_Beaten";

-- DropTable
DROP TABLE "_Dropped";

-- DropTable
DROP TABLE "_Playing";

-- DropTable
DROP TABLE "_ToPlay";

-- CreateTable
CREATE TABLE "UserGameStatus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "status" "GameStatus" NOT NULL,

    CONSTRAINT "UserGameStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserGameStatus" ADD CONSTRAINT "UserGameStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameStatus" ADD CONSTRAINT "UserGameStatus_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
