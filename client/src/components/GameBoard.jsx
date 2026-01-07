import { useState, useRef } from "react";
import styles from "../assets/css/AppLayout.module.css";
import { useLoaderData, Form } from "react-router";

function GameBoard() {
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
    setLeft(clicked.x - 10);
    setTop(clicked.y - 10);
    setImgDimension({ ...imgDimension, x: rect.width, y: rect.height });
    console.log(imgDimension);
  };

  return (
    <main className={styles.main}>
      <div>
        <img src={imageSrc} onClick={handleClick} ref={imgRef} />
        <div>
          <div
            className={`${styles.box} ${isClicked ? "" : styles.hidden}`}
            style={{
              top: top,
              left: left,
            }}
          />
          <div
            className={`${styles.dropdown} ${isClicked ? "" : styles.hidden}`}
            style={{
              top: top + 20,
              left: left + 20,
            }}
          >
            {charName.map((char) => (
              <ButtonForm
                key={char}
                top={top}
                left={left}
                imgDimension={imgDimension}
                character={char}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function ButtonForm({ top, left, imgDimension, character }) {
  return (
    <Form action="/game" method="post">
      <input type="hidden" name="top" value={top} />
      <input type="hidden" name="left" value={left} />
      <input type="hidden" name="height" value={imgDimension.y} />
      <input type="hidden" name="width" value={imgDimension.x} />
      <input type="hidden" name="character" value={character.toLowerCase()} />
      <button type="submit">{character}</button>
    </Form>
  );
}

export default GameBoard;
