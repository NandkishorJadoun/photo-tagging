import { useEffect, useState } from "react";

export const useGameSession = () => {
    const [gameId, setGameId] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(`${import.meta.env.VITE_API_URL}/api/game/start`, { signal, method: "POST" })
            .then(response => response.json())
            .then(data => setGameId(data.sessionId))
            .catch((error) => {
                if (error.name === "AbortError") {
                    return;
                }
            })

        return () => {
            controller.abort();
        };
    }, []);

    return [gameId];
}