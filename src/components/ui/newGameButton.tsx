import { Players } from "@/App";
import { Button } from "./button";

interface NewGameButtonProps {
  players: Players[];
  handleNewGame: () => void;
}

export function NewGameButton({ players, handleNewGame }: NewGameButtonProps) {
  return (
    <Button
      onClick={handleNewGame}
      disabled={players.length === 0}
      className="w-full bg-green-500 text-gray-900 text-lg font-medium hover:bg-green-600"
    >
      Novo jogo
    </Button>
  );
}
