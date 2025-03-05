import { SlGameController } from "react-icons/sl";
import { Player } from "./components/ui/player";
import { Header } from "./components/ui/header";
import { NewPlayerButton } from "./components/ui/newPlayerButton";
import { NewGameButton } from "./components/ui/newGameButton";

import { usePlayersStore } from "./store/players-store";

export function App() {
	const { players, roundNumber } = usePlayersStore();

	const sortedPlayers = [...players].sort((a, b) => {
		const isAEliminated = a.pointsAmount >= 500;
		const isBEliminated = b.pointsAmount >= 500;

		if (isAEliminated && !isBEliminated) return 1;
		if (!isAEliminated && isBEliminated) return -1;

		return a.pointsAmount - b.pointsAmount;
	});

	return (
		<div className="min-h-screen flex flex-col items-center bg-slate-700 text-slate-100">
			<Header />
			<main className="flex flex-col gap-3 w-[90%] mx-auto my-8 max-w-[50rem] ">
				<div className="flex gap-3 justify-between">
					<NewGameButton />
					<NewPlayerButton />
				</div>

				<div className="flex flex-col gap-4 my-3 h-full ">
					<div>
						<span className="text-xl">Rodada: {roundNumber}</span>
					</div>

					{sortedPlayers.length === 0 ? (
						<div className="flex flex-col items-center mt-16 gap-8 opacity-60">
							<SlGameController size={100} />
							<p className="text-xl font-medium">Adicione novos jogadores!</p>
						</div>
					) : (
						sortedPlayers.map((player, index) => (
							<Player
								key={player.playerName}
								rank={index}
								playerName={player.playerName}
								pointsAmount={player.pointsAmount}
								isPointsScored={player.isPointsScored}
							/>
						))
					)}
				</div>
			</main>
		</div>
	);
}
