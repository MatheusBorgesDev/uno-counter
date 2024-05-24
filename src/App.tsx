import { useEffect, useState } from "react";

import { SlGameController } from "react-icons/sl";

import { Button } from "./components/ui/button";
import { Player } from "./components/ui/player";

import { Header } from "./components/ui/header";
import { NewPlayerButton } from "./components/ui/newPlayerButton";

interface Players {
  playerName: string;
  pointsAmount: number;
}

export function App() {
  const [players, setPlayers] = useState<Players[]>([]);

  const [newPlayerName, setNewPlayerName] = useState("");

  function handleNewGame() {
    const resetedPlayersPoints = players.map((player) => ({
      ...player,
      pointsAmount: 0,
    }));
    setPlayers(resetedPlayersPoints);
  }

  function onNewPlayer(e: React.FormEvent) {
    e.preventDefault();
    if (newPlayerName === "") {
      return;
    }

    const newPlayer: Players = {
      playerName: newPlayerName,
      pointsAmount: 0,
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
  }

  function onRemovePlayer(playerName: string) {
    const filteredPlayers = players.filter(
      (player) => player.playerName != playerName
    );

    setPlayers(filteredPlayers);
  }

  function onAddPoints(playerName: string, points: number) {
    const updatedPlayerPoints = players.map((player) =>
      playerName === player.playerName
        ? { ...player, pointsAmount: player.pointsAmount + points }
        : player
    );
    setPlayers(updatedPlayerPoints);
  }

  const sortedPlayers = [...players].sort(
    (a, b) => a.pointsAmount - b.pointsAmount
  );

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
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100">
      <Header />

      <main className="flex flex-col gap-3 flex-1 w-[90%] mx-auto h-auto my-8 max-w-[50rem]">
        <div className="flex gap-3 justify-between">
          <Button
            onClick={handleNewGame}
            disabled={players.length === 0}
            className="w-full bg-green-500 text-gray-900 text-lg font-medium hover:bg-green-600"
          >
            Novo jogo
          </Button>

          <NewPlayerButton
            handleNewPlayer={onNewPlayer}
            newPlayerName={newPlayerName}
            setNewPlayerName={setNewPlayerName}
          />
        </div>

        <div className="flex flex-col gap-4 my-3 h-full">
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
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
