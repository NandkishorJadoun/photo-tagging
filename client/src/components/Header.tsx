import { Link } from "react-router";

export function Header() {
  return (
    <>
      <header className="text-neutral-950 bg-neutral-50 text-center text-2xl py-2 font-bold border-b border-b-neutral-600">
        <Link to={"/"}>Where's Waldo</Link>
      </header>
    </>
  );
}
