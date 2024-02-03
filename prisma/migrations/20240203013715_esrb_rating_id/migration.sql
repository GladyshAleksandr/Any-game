/*
  Warnings:

  - You are about to drop the `_EsrbRatingToGame` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `esrbRatingId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EsrbRatingToGame" DROP CONSTRAINT "_EsrbRatingToGame_A_fkey";

-- DropForeignKey
ALTER TABLE "_EsrbRatingToGame" DROP CONSTRAINT "_EsrbRatingToGame_B_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "esrbRatingId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_EsrbRatingToGame";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_esrbRatingId_fkey" FOREIGN KEY ("esrbRatingId") REFERENCES "EsrbRating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
