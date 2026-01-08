function isWithinTolerance(clickX, clickY, character, tolerance = 0.03) {
  const xDiff = Math.abs(clickX - character.x);
  const yDiff = Math.abs(clickY - character.y);
  return tolerance >= xDiff && tolerance >= yDiff;
}

module.exports = { isWithinTolerance };
