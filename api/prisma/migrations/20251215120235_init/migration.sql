-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "xCoord" DOUBLE PRECISION NOT NULL,
    "yCoord" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "gameSessions" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "foundWaldo" BOOLEAN NOT NULL DEFAULT false,
    "foundOdlaw" BOOLEAN NOT NULL DEFAULT false,
    "foundWizard" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "gameSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderboardEntries" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "duration" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_id_key" ON "characters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "characters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "leaderboardEntries_id_key" ON "leaderboardEntries"("id");
