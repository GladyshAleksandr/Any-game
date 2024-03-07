-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "description" TEXT,
ADD COLUMN     "gameStudioId" INTEGER,
ADD COLUMN     "trailers" TEXT[];

-- CreateTable
CREATE TABLE "GameStudio" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GameStudio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameStudio_slug_key" ON "GameStudio"("slug");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameStudioId_fkey" FOREIGN KEY ("gameStudioId") REFERENCES "GameStudio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
