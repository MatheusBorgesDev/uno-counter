import { Button } from "./button";
import { usePlayersStore } from "@/store/players-store";

export function NewGameButton() {
	const { players, startNewGame } = usePlayersStore();

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
