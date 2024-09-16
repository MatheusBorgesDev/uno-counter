import { Button } from "./button";
import { usePlayers } from "@/contexts/players-context";

export function NewGameButton() {
  const { startNewGame, players } = usePlayers();

  return (
    <Button
      onClick={startNewGame}
      disabled={players.length === 0}
      className="w-full bg-green-500 text-gray-900 text-lg font-medium hover:bg-green-600"
    >
      Novo jogo
    </Button>
  );
}
