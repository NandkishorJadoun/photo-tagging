import { Link } from "react-router";

function HomePage() {
  return (
    <main>
      <Link to={"/game"}>Play</Link>
      <Link to={"/leaderboard"}>Leaderboard</Link>
    </main>
  );
}

export default HomePage;
