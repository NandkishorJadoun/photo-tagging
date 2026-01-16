import { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "../assets/css/AppLayout.module.css";
import { useActionData, Form } from "react-router";
import type { MouseEventHandler } from "react";
import puzzleImgSrc from "/pic.jpg";
import { useGameSession } from "../hooks/useGameSession.js";

const initCharStatus = [
  { name: "waldo", found: false },
  { name: "odlaw", found: false },
  { name: "wizard", found: false },
];

function GameBoard() {
  const [gameId] = useGameSession();
  const resultData = useActionData();
  const [charStatus, SetCharStatus] = useState(initCharStatus);
  const [isGameOver, setIsGameOver] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  useEffect(() => {
    if (resultData?.characterStatus) {
      SetCharStatus(resultData.characterStatus);
      setIsGameOver(resultData.isGameOver);
    }
  }, [resultData]);

  useLayoutEffect(() => {
    if (isGameOver) {
      dialogRef.current?.showModal();
    }
  }, [isGameOver]);

  const charName = charStatus
    .filter((char) => !char.found)
    .map((char) => char.name);

  const handleClick: MouseEventHandler<HTMLImageElement> = (event) => {
    const rect = imgRef.current?.getBoundingClientRect();

    if (!rect) return;

    setMenuPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      w: rect.width,
      h: rect.height,
    });
  };

  const clickY =
    menuPosition && Math.round((menuPosition.y / menuPosition.h) * 100) / 100;

  const clickX =
    menuPosition && Math.round((menuPosition.x / menuPosition.w) * 100) / 100;

  return (
    <main>
      <div className={styles.main}>
        <img src={puzzleImgSrc} onClick={handleClick} ref={imgRef} />
        {menuPosition && (
          <div
            className={styles.dropdown}
            style={{ top: menuPosition.y + 10, left: menuPosition.x + 10 }}
          >
            {charName.map((character) => (
              <ButtonForm
                key={character}
                clickX={clickX}
                clickY={clickY}
                character={character}
                id={gameId}
                closeMenu={() => setMenuPosition(null)}
              />
            ))}
          </div>
        )}
      </div>
      <div>Result: {resultData && resultData.message}</div>

      <dialog ref={dialogRef}>
        <Form action="/leaderboard" method="post">
          <div>
            <label htmlFor="username">Your Name: </label>
            <input type="text" name="username" id="username" required />
          </div>
          <input type="hidden" name="gameId" value={gameId} />
          <button type="submit">Submit</button>
        </Form>
      </dialog>
    </main>
  );
}

function ButtonForm({ clickX, clickY, character, id, closeMenu }: any) {
  return (
    <Form onSubmit={closeMenu} action="/game" method="post">
      <input type="hidden" name="clickX" value={clickX} />
      <input type="hidden" name="clickY" value={clickY} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="character" value={character} />
      <button type="submit">{character}</button>
    </Form>
  );
}

export default GameBoard;
