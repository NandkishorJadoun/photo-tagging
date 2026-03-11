import "dotenv/config"
import cors from "cors";
import express, { json, urlencoded, type Express } from "express";
import { prisma } from "./libs/prisma.js"
import { isWithinTolerance, createCharacterStatus } from "./utils/helpers.js";
import type { Character, GameSession } from "../generated/prisma/index.js";

export const app: Express = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.post("/api/game/start", async (_req, res) => {

  const [allCharacters, createSession] = await prisma.$transaction([
    prisma.character.findMany(),
    prisma.gameSession.create({
      data: {},
    })
  ]) as [Character[], GameSession]

  const characterStatus = allCharacters.map(character => ({
    name: character.name,
    found: false,
  }))

  res.json({
    message: "Game Started",
    characterStatus,
    sessionId: createSession.id,
  });
});

app.post("/api/game/play", async (req, res) => {
  const { character, clickX, clickY, id } = req.body;

  let isGameOver = false;

  const [characterData, allCharacters, session] = await prisma.$transaction([
    prisma.character.findUnique({ where: { name: character } }),
    prisma.character.findMany(),
    prisma.gameSession.findUnique({ where: { id } })
  ]) as [Character | null, Character[], GameSession | null]

  if (!characterData || !session) {
    return res.status(404).json({ message: "Character or Game session not found" });
  }

  const isFound = isWithinTolerance(clickX, clickY, characterData);

  if (!isFound) {
    const characterStatus = createCharacterStatus(allCharacters, session.characters)

    return res.status(200).json({ message: "Try again!", characterStatus, isGameOver });
  }

  const updatedSession = await prisma.gameSession.update({
    where: { id },
    data: { characters: { push: character } },
  })

  const characterStatus = createCharacterStatus(allCharacters, updatedSession.characters)

  isGameOver = allCharacters.every(char =>
    updatedSession.characters.includes(char.name)
  );

  if (isGameOver) {
    await prisma.gameSession.update({
      where: { id },
      data: { endTime: new Date() }
    })
  }

  return res.json({
    message: `Found ${character}`, characterStatus, isGameOver,
  });
});

app.post("/api/game/end", async (req, res) => {
  const { username, gameId } = req.body

  const gameSession = await prisma.gameSession.findUnique({
    where: { id: gameId }
  })

  if (!gameSession || !gameSession.endTime) {
    return res.status(404).json({ message: "No Game data found or game not finished" })
  }

  const duration = gameSession.endTime.getTime() - gameSession.startTime.getTime();

  await prisma.leaderboardEntry.create({
    data: {
      userName: username,
      session: {
        connect: { id: gameId }
      },
      duration
    }
  })

  return res.json({ message: "User added in leaderboard successfully" })
})

app.get("/api/leaderboard", async (_req, res) => {
  const leaderboard = await prisma.leaderboardEntry.findMany({ orderBy: { duration: 'asc' } })
  return res.status(200).json({ message: "Get leaderboard successfully", leaderboard })
})
