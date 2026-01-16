import { useFetchLeaderboard } from "../hooks/useFetchLeaderboard.js";

function LeaderBoard() {
  const [leaderboard, error, loading] = useFetchLeaderboard();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <main>{JSON.stringify(leaderboard)}</main>;
}

export default LeaderBoard;
