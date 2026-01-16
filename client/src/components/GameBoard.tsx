import { useState, useRef, useEffect } from "react";
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
  const resultData = useActionData();
  const [charStatus, SetCharStatus] = useState(initCharStatus);
  const [gameId] = useGameSession();
  const imgRef = useRef<HTMLImageElement>(null);

  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  useEffect(() => {
    if (resultData && resultData.characters) {
      SetCharStatus(resultData.characters);
    }
  }, [resultData]);

  const charName = charStatus
    .filter((char) => !char.found)
    .map((char) => char.name);

  const handleClick: MouseEventHandler<HTMLImageElement> = (event) => {
    const img = imgRef.current!;
    const rect = img.getBoundingClientRect();

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
        <div>
          {menuPosition && (
            <div
              className={styles.box}
              style={{
                top: menuPosition.y - (menuPosition.h * 1.5) / 200,
                left: menuPosition.x - (menuPosition.w * 1.5) / 200,
                width: (menuPosition.w * 3) / 200,
                height: (menuPosition.h * 3) / 200,
              }}
            />
          )}
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
      </div>
      <div>Result: {resultData && resultData.message}</div>
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
