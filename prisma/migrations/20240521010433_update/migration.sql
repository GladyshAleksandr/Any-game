/*
  Warnings:

  - The primary key for the `VerificationCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VerificationCode` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "VerificationCode_userId_code_key";

-- AlterTable
ALTER TABLE "VerificationCode" DROP CONSTRAINT "VerificationCode_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("userId");
