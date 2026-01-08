/*
  Warnings:

  - You are about to drop the column `id` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `xCoord` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `yCoord` on the `characters` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "characters_id_key";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "id",
DROP COLUMN "xCoord",
DROP COLUMN "yCoord",
ADD COLUMN     "x" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "y" INTEGER NOT NULL DEFAULT 0;
