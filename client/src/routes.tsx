import { AppLayout } from "./components/AppLayout.js";
import HomePage from "./components/HomePage.js";
import GameBoard from "./components/GameBoard.js";
import LeaderBoard from "./components/LeaderBoard.js";

import { gameAction, leaderboardAction } from "./assets/ts/action.js";

export const routes = [
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "game",
        Component: GameBoard,
        action: gameAction,
      },
      {
        path: "leaderboard",
        Component: LeaderBoard,
        action: leaderboardAction,
      },
    ],
  },
];
