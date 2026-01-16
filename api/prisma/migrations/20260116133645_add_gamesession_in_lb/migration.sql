/*
  Warnings:

  - Added the required column `gameSessionId` to the `leaderboard_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leaderboard_entries" ADD COLUMN     "gameSessionId" TEXT NOT NULL,
ALTER COLUMN "userName" SET DEFAULT 'User';

-- AddForeignKey
ALTER TABLE "leaderboard_entries" ADD CONSTRAINT "leaderboard_entries_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "game_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
