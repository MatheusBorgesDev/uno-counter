import { useEffect, useState } from "react";
import { SlGameController } from "react-icons/sl";
import { Player } from "./components/ui/player";
import { Header } from "./components/ui/header";
import { NewPlayerButton } from "./components/ui/newPlayerButton";
import { NewGameButton } from "./components/ui/newGameButton";

export interface Players {
  playerName: string;
  pointsAmount: number;
  isPointsScored: boolean;
}

export function App() {
  const [players, setPlayers] = useState<Players[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [roundNumber, setRoundNumber] = useState(1);

  function onNewGame() {
    const resetedPlayersPoints = players.map((player) => ({
      ...player,
      pointsAmount: 0,
      isPointsScored: false,
    }));
    setPlayers(resetedPlayersPoints);
    setRoundNumber(1);
  }

  function onNewPlayer(e: React.FormEvent) {
    e.preventDefault();
    if (newPlayerName === "") return;

    const newPlayer: Players = {
      playerName: newPlayerName,
      pointsAmount: 0,
      isPointsScored: false,
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
  }

  function onRemovePlayer(playerName: string) {
    const filteredPlayers = players.filter(
      (player) => player.playerName !== playerName
    );
    setPlayers(filteredPlayers);
  }

  function onAddPoints(playerName: string, points: number) {
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

  const sortedPlayers = [...players].sort((a, b) => {
    const isAEliminated = a.pointsAmount >= 500;
    const isBEliminated = b.pointsAmount >= 500;

    if (isAEliminated && !isBEliminated) return 1;
    if (!isAEliminated && isBEliminated) return -1;

    return a.pointsAmount - b.pointsAmount;
  });

  useEffect(() => {
    const storedPlayers = localStorage.getItem("@uno-contador-players");
    if (storedPlayers) {
      const parsedPlayers: Players[] = JSON.parse(storedPlayers);
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
    <div className="min-h-screen flex flex-col items-center bg-slate-900 text-slate-100">
      <Header />
      <main className="flex flex-col gap-3 w-[90%] mx-auto my-8 max-w-[50rem] ">
        <div className="flex gap-3 justify-between">
          <NewGameButton handleNewGame={onNewGame} players={players} />
          <NewPlayerButton
            handleNewPlayer={onNewPlayer}
            newPlayerName={newPlayerName}
            setNewPlayerName={setNewPlayerName}
          />
        </div>

        <div className="flex flex-col gap-4 my-3 h-full ">
          <div>
            <span className="text-xl">Rodada: {roundNumber}</span>
          </div>

          {sortedPlayers.length == 0 ? (
            <div className="flex flex-col items-center mt-16 gap-8 opacity-60">
              <SlGameController size={100} />
              <p className="text-xl font-medium">Adicione novos jogadores!</p>
            </div>
          ) : (
            sortedPlayers.map((player, index) => (
              <Player
                key={index}
                rank={index}
                playerName={player.playerName}
                pointsAmount={player.pointsAmount}
                handleRemovePlayer={() => onRemovePlayer(player.playerName)}
                handleAddPoints={(points) =>
                  onAddPoints(player.playerName, points)
                }
                isPointsScored={player.isPointsScored}
                roundNumber={roundNumber}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
