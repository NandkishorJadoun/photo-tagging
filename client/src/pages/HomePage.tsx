import { Link } from "react-router";
import { Header } from "../components/Header.js";

const linkClass = "text-xl border border-neutral-600 py-1 px-4";

function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 flex flex-col flex-1 justify-center items-center gap-3">
        <Link className={`${linkClass}`} to={"/game"}>
          Play
        </Link>
        <Link className={`${linkClass}`} to={"/leaderboard"}>
          Leaderboard
        </Link>
      </main>
    </>
  );
}

export default HomePage;
