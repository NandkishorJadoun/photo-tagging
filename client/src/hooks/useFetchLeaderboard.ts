import { useEffect, useState } from "react";

export function useFetchLeaderboard() {
  const [leaderboard, setLeaderboard] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetch(`${import.meta.env.VITE_API_URL}/api/leaderboard`, { signal })
      .then(response => {
        if (response.status >= 400) throw new Error("Server error");
        return response.json()
      })
      .then(data => setLeaderboard(data.leaderboard))
      .catch(error => {
        if (error.name === "AbortError") return
        setError(error)
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, []);

  return [leaderboard, error, loading]
}