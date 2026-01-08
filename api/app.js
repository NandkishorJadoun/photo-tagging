const express = require("express");
const cors = require("cors");
const prisma = require("./libs/prisma");
const { isWithinTolerance } = require("./utils/helpers");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/game", (req, res) => {
  res.json({
    message: "Image sent successfully",
    data: process.env.IMAGE_URL,
  });
});

app.post("/api/game/play", async (req, res) => {
  const { character, clickX, clickY } = req.body;

  const characterData = await prisma.character.findUnique({
    where: {
      name: character,
    },
  });

  const isCharacterFound = isWithinTolerance(clickX, clickY, characterData);

  if (isCharacterFound) {
    return res.status(200).json({ message: `${character} Found` });
  }

  return res.status(200).json({ message: `${character} NOT Found!` });
});

module.exports = app;
