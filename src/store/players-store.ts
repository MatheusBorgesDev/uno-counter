import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PlayerType {
	rank?: number;
	playerName: string;
	pointsAmount: number;
	isPointsScored: boolean;
}

interface PlayersState {
	players: PlayerType[];
	newPlayerName: string;
	roundNumber: number;
	startNewGame: () => void;
	addNewPlayer: (e: React.FormEvent) => void;
	removePlayer: (playerName: string) => void;
	addPlayerPoints: (playerName: string, points: number) => void;
	setNewPlayerName: (name: string) => void;
}

export const usePlayersStore = create<PlayersState>()(
	persist(
		(set, get) => ({
			players: [],
			newPlayerName: "",
			roundNumber: 1,
			startNewGame: () => {
				const resetedPlayersPoints = get().players.map((player) => ({
					...player,
					pointsAmount: 0,
					isPointsScored: false,
				}));
				set({ players: resetedPlayersPoints, roundNumber: 1 });
			},
			addNewPlayer: (e: React.FormEvent) => {
				e.preventDefault();
				if (get().newPlayerName === "") return;

				const newPlayer: PlayerType = {
					playerName: get().newPlayerName,
					pointsAmount: 0,
					isPointsScored: false,
				};

				set({ players: [...get().players, newPlayer], newPlayerName: "" });
			},
			removePlayer: (playerName: string) => {
				const filteredPlayers = get().players.filter(
					(player) => player.playerName !== playerName,
				);
				set({ players: filteredPlayers });
			},
			addPlayerPoints: (playerName: string, points: number) => {
				const updatedPlayers = get().players.map((player) =>
					player.playerName === playerName
						? {
								...player,
								pointsAmount: player.pointsAmount + points,
								isPointsScored: true,
							}
						: player,
				);
				set({ players: updatedPlayers });

				if (updatedPlayers.every((player) => player.isPointsScored)) {
					const resetedPlayers = updatedPlayers.map((player) => ({
						...player,
						isPointsScored: false,
					}));
					set({ players: resetedPlayers, roundNumber: get().roundNumber + 1 });
				}
			},
			setNewPlayerName: (name: string) => set({ newPlayerName: name }),
		}),
		{
			name: "@uno-contador-players",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
