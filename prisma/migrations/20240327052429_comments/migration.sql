/*
  Warnings:

  - You are about to drop the column `type` on the `CommentAction` table. All the data in the column will be lost.
  - Added the required column `isLike` to the `CommentAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "repliedToId" INTEGER;

-- AlterTable
ALTER TABLE "CommentAction" DROP COLUMN "type",
ADD COLUMN     "isLike" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "CommentActionType";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_repliedToId_fkey" FOREIGN KEY ("repliedToId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
