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
    // fix it with try catch i guess
    return null
  }

  const isFound = isWithinTolerance(clickX, clickY, characterData);

  if (isFound) {
    const updatedSession = await prisma.gameSession.update({
      where: { id },
      data: {
        characters: { push: character },
      },
    });

    const allCharacters = await prisma.character.findMany();

    const characterStatus = allCharacters.map((char) => ({
      name: char.name,
      found: updatedSession.characters.includes(char.name),
    }));

    return res.json({
      message: `Found ${character}`,
      characters: characterStatus,
      gameover: updatedSession.characters.length === allCharacters.length,
    });
  }

  res.status(200).json({ message: "Try again!" });
});


