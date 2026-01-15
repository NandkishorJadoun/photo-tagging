import { AppLayout } from "./components/AppLayout.js";
import HomePage from "./components/HomePage.js";
import GameBoard from "./components/GameBoard.js";
import LeaderBoard from "./components/LeaderBoard.js";

import { gameAction } from "./assets/js/action.js";

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
      },
    ],
  },
];
