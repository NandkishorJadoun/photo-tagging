/*
  Warnings:

  - You are about to drop the column `foundOdlaw` on the `gameSessions` table. All the data in the column will be lost.
  - You are about to drop the column `foundWaldo` on the `gameSessions` table. All the data in the column will be lost.
  - You are about to drop the column `foundWizard` on the `gameSessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gameSessions" DROP COLUMN "foundOdlaw",
DROP COLUMN "foundWaldo",
DROP COLUMN "foundWizard",
ADD COLUMN     "foundCharacters" TEXT[] DEFAULT ARRAY[]::TEXT[];
