import HomePage from "./pages/HomePage.js";
import GameBoard from "./pages/GameBoard.js";
import LeaderBoard from "./pages/LeaderBoard.js";

import { gameAction, leaderboardAction } from "./assets/ts/action.js";

export const routes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/game",
    Component: GameBoard,
    action: gameAction,
  },
  {
    path: "/leaderboard",
    Component: LeaderBoard,
    action: leaderboardAction,
  },
];
