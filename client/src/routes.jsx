import { AppLayout } from "./AppLayout";
import HomePage from "./components/HomePage";
import GameBoard from "./components/GameBoard";
import LeaderBoard from "./components/LeaderBoard";

import { imageLoader } from "./assets/js/loader";
import { gameAction } from "./assets/js/action";

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
        loader: imageLoader,
        action: gameAction,
      },
      {
        path: "leaderboard",
        Component: LeaderBoard,
      },
    ],
  },
];
