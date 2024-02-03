-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_esrbRatingId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "esrbRatingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_esrbRatingId_fkey" FOREIGN KEY ("esrbRatingId") REFERENCES "EsrbRating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
