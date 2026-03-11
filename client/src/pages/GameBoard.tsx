import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  type MouseEventHandler,
} from "react";
import { Form } from "react-router";
import puzzleImgSrc from "/pic.jpg";
import { Header } from "../components/Header.js";
import type { MenuPosition, CharacterStatus } from "../types/index.js";
import { PlayButton } from "../components/PlayButton.js";

function GameBoard() {
  const [message, setMessage] = useState(null);
  const [characterStatus, setCharacterStatus] = useState<
    CharacterStatus[] | null
  >(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameId, setGameId] = useState("");
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${import.meta.env.VITE_API_URL}/api/game/start`, {
      signal,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setGameId(data.sessionId);
        setCharacterStatus(data.characterStatus);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  useLayoutEffect(() => {
    if (isGameOver) {
      dialogRef.current?.showModal();
    }
  }, [isGameOver]);

  const charName =
    characterStatus &&
    characterStatus.filter((char) => !char.found).map((char) => char.name);

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

  const handlePlay = async (character: string) => {
    const bodyData = JSON.stringify({ character, clickX, clickY, id: gameId });
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/game/play`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyData,
    });

    const { message, isGameOver, characterStatus } = await res.json();

    setMessage(message);
    setIsGameOver(isGameOver);
    setCharacterStatus(characterStatus);
    setMenuPosition(null);
  };

  const clickY =
    menuPosition && Math.round((menuPosition.y / menuPosition.h) * 100) / 100;

  const clickX =
    menuPosition && Math.round((menuPosition.x / menuPosition.w) * 100) / 100;

  return (
    <>
      <Header />
      <main className="relative">
        <div>
          <img
            src={puzzleImgSrc}
            onClick={handleClick}
            ref={imgRef}
            className="cursor-crosshair"
          />
          {menuPosition && (
            <div
              className="absolute bg-neutral-700/90 text-neutral-50 border border-neutral-950"
              style={{ top: menuPosition.y + 10, left: menuPosition.x + 10 }}
            >
              {charName &&
                charName.map((character) => (
                  <PlayButton
                    key={character}
                    character={character}
                    handlePlay={() => handlePlay(character)}
                  />
                ))}
            </div>
          )}
        </div>
        <hr className="border-b-0 border-t-neutral-600 " />
        {message && <div>Result: {message}</div>}
        <dialog
          className="top-[50%] left-[50%] translate-[-50%]"
          ref={dialogRef}
        >
          <Form
            className="flex flex-col gap-4 p-4 items-center"
            action="/leaderboard"
            method="post"
          >
            <div>
              <label htmlFor="username">Your Name: </label>
              <input
                className="border"
                type="text"
                name="username"
                id="username"
                required
              />
            </div>
            <input type="hidden" name="gameId" value={gameId} />
            <button
              className="border border-neutral-600 py-1 px-4"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </dialog>
      </main>
    </>
  );
}

export default GameBoard;
