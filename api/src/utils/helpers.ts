import type { Character } from "../../generated/prisma/index.js";

export function isWithinTolerance(clickX: number, clickY: number, character: Character, tolerance = 0.03) {
  const xDiff = Math.abs(clickX - character.x);
  const yDiff = Math.abs(clickY - character.y);
  return tolerance >= xDiff && tolerance >= yDiff;
}