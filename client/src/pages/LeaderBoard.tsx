import { useFetchLeaderboard } from "../hooks/useFetchLeaderboard.js";

function LeaderBoard() {
  const [leaderboard, error, loading] = useFetchLeaderboard();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Some error...</div>;
  if (!leaderboard) return <div>No Data found...</div>;

  return (
    <main>
      <h1>LeaderBoard</h1>
      <div>
        {leaderboard.map((entry) => {
          return (
            <div key={entry.id}>
              <p>{entry.userName}</p>
              <p>{entry.duration} ms</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default LeaderBoard;
