import { useState } from "react";

import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "./input";

interface PlayerProps {
  rank: number;
  playerName: string;
  pointsAmount: number;
  handleRemovePlayer: () => void;
  handleAddPoints: (points: number) => void;
}

export function Player({
  rank,
  playerName,
  pointsAmount,
  handleRemovePlayer,
  handleAddPoints,
}: PlayerProps) {
  const pointsToLoseGame = 500 - pointsAmount;
  const [newPoints, setNewPoints] = useState<number>(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleAddPoints(newPoints);
    setNewPoints(0); // Reset the input field
  }

  return (
    <div
      className={`flex items-center gap-3 h-32 ${
        pointsAmount > 500 && "opacity-60"
      }`}
    >
      <Dialog>
        <DialogTrigger className="w-full">
          <Card className="overflow-hidden">
            <CardHeader
              className={`p-2 flex-row items-center justify-between rounded-lg bg-gray-300 ${
                pointsAmount > 500 && "bg-red-400"
              }`}
            >
              <CardTitle className="flex gap-3 text-xl items-center">
                <div className="bg-gray-200 p-2 rounded-full">
                  {pointsAmount >= 500 ? "Jogador eliminado" : `${rank + 1}º`}
                </div>
                <span>{playerName}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 flex justify-center gap-4">
              <div className="flex flex-col items-center">
                <p className="font-medium">Pontos acumulados</p>
                <span className="font-bold ">{pointsAmount}</span>
              </div>

              <div className="w-1 border-2 rounded-full" />

              <div className="flex flex-col items-center">
                <p className="font-medium">Pontos para sair</p>
                <span className="font-bold text-red-500">
                  {pointsToLoseGame}
                </span>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-3 w-full"
          >
            <Input
              type="number"
              value={newPoints}
              onChange={(e) => setNewPoints(Number(e.target.value))}
              placeholder="Adicionar pontos"
            />
            <DialogClose className="w-full">
              <Button className="w-full" type="submit">
                Adicionar
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        onClick={handleRemovePlayer}
        className="text-red-900 text-xl font-bold bg-red-500 h-full hover:bg-red-600 hover:no-underline"
      >
        X
      </Button>
    </div>
  );
}
