import { useFetchLeaderboard } from "../hooks/useFetchLeaderboard.js";
import { Header } from "../components/Header.js";

function LeaderBoard() {
  const [leaderboard, error, loading] = useFetchLeaderboard();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Some error...</div>;
  if (!leaderboard) return <div>No Data found...</div>;

  return (
    <>
      <Header />
      <main className="text-center">
        <h1 className="font-bold text-xl py-3">LeaderBoard</h1>
        <div className="flex flex-col gap-1.5 items-center  mx-2">
          {leaderboard.map((entry) => {
            return (
              <div
                className="border grid grid-cols-[1fr_auto] p-1 min-w-full md:min-w-xl"
                key={entry.id}
              >
                <p className="text-start">{entry.userName}</p>
                <p>{entry.duration} ms</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default LeaderBoard;
