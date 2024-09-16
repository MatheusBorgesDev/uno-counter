import { createContext, useEffect, useState } from "react";

export interface PlayerType {
  rank?: number;
  playerName: string;
  pointsAmount: number;
  isPointsScored: boolean;
}

interface PlayersContextProps {
  players: PlayerType[];
  startNewGame: () => void;
  addNewPlayer: (e: React.FormEvent) => void;
  removePlayer: (playerName: string) => void;
  addPlayerPoints: (playerName: string, points: number) => void;
  roundNumber: number;
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
}

export const PlayersContext = createContext({} as PlayersContextProps);

interface PlayersProviderProps {
  children: React.ReactNode;
}

export function PlayersProvider({ children }: PlayersProviderProps) {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [roundNumber, setRoundNumber] = useState(1);

  function startNewGame() {
    const resetedPlayersPoints = players.map((player) => ({
      ...player,
      pointsAmount: 0,
      isPointsScored: false,
    }));
    setPlayers(resetedPlayersPoints);
    setRoundNumber(1);
  }

  function addNewPlayer(e: React.FormEvent) {
    e.preventDefault();
    if (newPlayerName === "") return;

    const newPlayer: PlayerType = {
      playerName: newPlayerName,
      pointsAmount: 0,
      isPointsScored: false,
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
  }

  function removePlayer(playerName: string) {
    const filteredPlayers = players.filter(
      (player) => player.playerName !== playerName
    );
    setPlayers(filteredPlayers);
  }

  function addPlayerPoints(playerName: string, points: number) {
    const updatedPlayers = players.map((player) =>
      player.playerName === playerName
        ? {
            ...player,
            pointsAmount: player.pointsAmount + points,
            isPointsScored: true,
          }
        : player
    );
    setPlayers(updatedPlayers);

    if (updatedPlayers.every((player) => player.isPointsScored)) {
      const resetedPlayers = updatedPlayers.map((player) => ({
        ...player,
        isPointsScored: false,
      }));
      setPlayers(resetedPlayers);
      setRoundNumber((prevRound) => prevRound + 1);
    }
  }

  useEffect(() => {
    const storedPlayers = localStorage.getItem("@uno-contador-players");
    if (storedPlayers) {
      const parsedPlayers: PlayerType[] = JSON.parse(storedPlayers);
      if (parsedPlayers.length > 0) {
        setPlayers(parsedPlayers);
      } else {
        localStorage.removeItem("@uno-contador-players");
      }
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem("@uno-contador-players", JSON.stringify(players));
    } else {
      localStorage.removeItem("@uno-contador-players");
    }
  }, [players]);

  return (
    <PlayersContext.Provider
      value={{
        startNewGame,
        addNewPlayer,
        roundNumber,
        players,
        addPlayerPoints,
        removePlayer,
        newPlayerName,
        setNewPlayerName,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}
