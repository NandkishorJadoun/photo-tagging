import { useState, useRef, useEffect } from "react";
import styles from "../assets/css/AppLayout.module.css";
import { useActionData, Form } from "react-router";
import type { MouseEventHandler } from "react";
import puzzleImgSrc from "/pic.jpg";
import { useGameSession } from "../hooks/useGameSession.js";

function GameBoard() {
  const resultData = useActionData();

  const imgRef = useRef<HTMLImageElement>(null);
  const [isClicked, setIsClicked] = useState(false);

  // TODO: Make the bottom state a single object

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const [imgDimension, setImgDimension] = useState({ x: 0, y: 0 });

  interface CharacterInfo {
    name: string;
    found: boolean;
  }

  const [charStatus, SetCharStatus] = useState<CharacterInfo[]>([]);

  const [gameId] = useGameSession();

  useEffect(() => {
    if (resultData && resultData.characters) {
      SetCharStatus(resultData.characters);
    }
  }, [resultData]);

  const charName = charStatus
    .filter((char) => !char.found)
    .map((char) => char.name);

  const handleClick: MouseEventHandler<HTMLImageElement> = (event) => {
    if (isClicked) {
      setIsClicked(false);
      return;
    }

    const img = imgRef.current!;
    const rect = img.getBoundingClientRect();

    const clicked = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setIsClicked(true);
    setLeft(clicked.x);
    setTop(clicked.y);
    setImgDimension({ ...imgDimension, x: rect.width, y: rect.height });
  };

  return (
    <main>
      <div className={styles.main}>
        <img src={puzzleImgSrc} onClick={handleClick} ref={imgRef} />
        <div>
          <div
            className={`${styles.box} ${isClicked ? "" : styles.hidden}`}
            style={{
              top: top - (imgDimension.y * 1.5) / 200,
              left: left - (imgDimension.x * 1.5) / 200,
              width: (imgDimension.x * 3) / 200,
              height: (imgDimension.y * 3) / 200,
            }}
          />
          <div
            className={`${styles.dropdown} ${isClicked ? "" : styles.hidden}`}
            style={{ top: top + 10, left: left + 10 }}
          >
            {charName.map((char) => (
              <ButtonForm
                key={char}
                clickY={Math.round((top / imgDimension.y) * 100) / 100}
                clickX={Math.round((left / imgDimension.x) * 100) / 100}
                character={char}
                id={gameId}
                setIsClicked={setIsClicked}
              />
            ))}
          </div>
        </div>
      </div>
      <div>Result: {resultData && resultData.message}</div>
    </main>
  );
}

function ButtonForm({ clickX, clickY, character, id, setIsClicked }: any) {
  return (
    <Form onSubmit={() => setIsClicked(false)} action="/game" method="post">
      <input type="hidden" name="clickX" value={clickX} />
      <input type="hidden" name="clickY" value={clickY} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="character" value={character} />
      <button type="submit">{character}</button>
    </Form>
  );
}

export default GameBoard;
