import "dotenv/config"
import cors from "cors";
import express, { json, urlencoded } from "express";
import { prisma } from "./libs/prisma.js"
import { isWithinTolerance } from "./utils/helpers.js";

export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.post("/api/game/start", async (req, res) => {
  const session = await prisma.gameSession.create({ data: {} });

  res.json({
    message: "Game Started",
    sessionId: session.id,
  });
});

app.post("/api/game/play", async (req, res) => {
  const { character, clickX, clickY, id } = req.body;

  const characterData = await prisma.character.findUnique({
    where: { name: character },
  });

  if (!characterData) {
    return res.status(404).json({ message: "Character not found" });
  }

  const isFound = isWithinTolerance(clickX, clickY, characterData);

  if (!isFound) {
    return res.status(200).json({ message: "Try again!" });
  }

  const [allCharacters, updatedSession] = await prisma.$transaction([
    prisma.character.findMany(),
    prisma.gameSession.update({
      where: { id },
      data: { characters: { push: character } },
    })
  ])

  const characterStatus = allCharacters.map((char) => ({
    name: char.name,
    found: updatedSession.characters.includes(char.name),
  }));

  const isGameOver = allCharacters.every(char =>
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

app.get("/api/leaderboard", async (req, res) => {
  const leaderboard = await prisma.leaderboardEntry.findMany({ where: {} })
  return res.status(200).json({ message: "Get leaderboard successfully", leaderboard })
})