export function PlayButton({
  character,
  handlePlay,
}: {
  character: string;
  handlePlay: () => void;
}) {
  return (
    <button onClick={handlePlay} className="px-3 py-1 cursor-pointer">
      {character}
    </button>
  );
}
