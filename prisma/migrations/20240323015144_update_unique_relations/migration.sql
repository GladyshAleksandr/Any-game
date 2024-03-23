/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,commentId]` on the table `CommentAction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,gameId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,gameId]` on the table `UserGameStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment_userId_gameId_key" ON "Comment"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentAction_userId_commentId_key" ON "CommentAction"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_gameId_key" ON "Rating"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGameStatus_userId_gameId_key" ON "UserGameStatus"("userId", "gameId");
