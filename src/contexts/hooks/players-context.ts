import { useContext } from "react";
import { PlayersContext } from "../players-context";

export function usePlayers() {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
}
