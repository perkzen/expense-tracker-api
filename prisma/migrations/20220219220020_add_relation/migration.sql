/*
  Warnings:

  - Added the required column `userId` to the `expanses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expanses" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "expanses" ADD CONSTRAINT "expanses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
