import { useState, useRef } from "react";
import styles from "../assets/css/AppLayout.module.css";
import { useLoaderData, useActionData, Form } from "react-router";

function GameBoard() {
  const resultData = useActionData();
  const imageSrc = useLoaderData();
  const imgRef = useRef();

  const [isClicked, setIsClicked] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [imgDimension, setImgDimension] = useState({ x: 0, y: 0 });
  const charName = ["Waldo", "Odlaw", "Wizard"];

  const handleClick = (event) => {
    if (isClicked) {
      setIsClicked(false);
      return;
    }

    const img = imgRef.current;
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
        <img src={imageSrc} onClick={handleClick} ref={imgRef} />
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
              />
            ))}
          </div>
        </div>
      </div>
      <div>Result: {resultData && resultData.message}</div>
    </main>
  );
}

function ButtonForm({ clickX, clickY, character }) {
  return (
    <Form action="/game" method="post">
      <input type="hidden" name="clickX" value={clickX} />
      <input type="hidden" name="clickY" value={clickY} />
      <input type="hidden" name="character" value={character.toLowerCase()} />
      <button type="submit">{character}</button>
    </Form>
  );
}

export default GameBoard;
