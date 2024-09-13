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
import { FaPlus } from "react-icons/fa";
import { Check, X } from "lucide-react";

interface PlayerProps {
  rank: number;
  playerName: string;
  pointsAmount: number;
  handleRemovePlayer: () => void;
  handleAddPoints: (points: number) => void;
  isPointsScored: boolean;
  roundNumber: number;
}

export function Player({
  rank,
  playerName,
  pointsAmount,
  handleRemovePlayer,
  handleAddPoints,
  isPointsScored,
  roundNumber,
}: PlayerProps) {
  const pointsToLoseGame = 500 - pointsAmount;
  const [newPoints, setNewPoints] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPoints > 0) {
      handleAddPoints(newPoints);
      setNewPoints(0);
    }
  }

  const eliminatedPlayer = pointsAmount >= 500;

  return (
    <div
      className={`flex items-center gap-3   ${
        eliminatedPlayer ? "opacity-60" : ""
      }`}
    >
      <Dialog>
        <DialogTrigger className="w-full truncate" disabled={eliminatedPlayer}>
          <Card className="overflow-hidden ">
            <CardHeader
              className={`p-2 flex-row items-center justify-between rounded-lg bg-gray-300 ${
                eliminatedPlayer && "bg-red-400"
              }`}
            >
              <CardTitle className="flex text-lg items-center justify-between w-full">
                <div className="flex gap-2 items-center">
                  <div className="bg-gray-200 p-2 rounded-full flex gap-2">
                    {eliminatedPlayer ? <X size={15} /> : `${rank + 1}º`}
                  </div>
                  <span className="">{playerName}</span>
                </div>

                <div className="text-sm flex items-center justify-center">
                  {eliminatedPlayer && (
                    <span className="text-black">Eliminado</span>
                  )}

                  {!eliminatedPlayer && !isPointsScored && (
                    <span>Rodada {roundNumber} ...</span>
                  )}

                  {!eliminatedPlayer && isPointsScored && (
                    <div className="flex gap-1 items-center">
                      Rodada {roundNumber}{" "}
                      <Check size={18} className="text-green-800" />{" "}
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 flex justify-center gap-4">
              <div className="flex flex-col items-center">
                <p className="font-medium">Pontuação</p>
                <span className="font-bold bg-gray-900 text-gray-100 w-10 rounded-full">
                  {pointsAmount}
                </span>
              </div>

              {!eliminatedPlayer && (
                <>
                  <div className=" border rounded-full" />

                  <div className="flex flex-col items-center">
                    <p className="font-medium">Pontos para sair</p>
                    <span className="font-bold text-red-500">
                      {pointsToLoseGame}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="flex flex-col gap-3 justify-center w-64 h-52 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-3 w-full"
          >
            <Input
              type="number"
              value={newPoints}
              onChange={(e) => setNewPoints(Number(e.target.value))}
              placeholder="Adicionar pontos"
              min="0"
              className="w-full"
            />
            <DialogClose className="w-full">
              <Button
                className="w-full flex gap-2 bg-green-500 text-gray-900 text-lg font-medium hover:bg-green-600"
                type="submit"
                disabled={eliminatedPlayer}
              >
                <FaPlus />
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog>
        {!eliminatedPlayer && (
          <DialogTrigger asChild>
            <Button className="text-red-900 text-xl font-bold bg-red-500 h-32 hover:bg-red-600 hover:no-underline">
              X
            </Button>
          </DialogTrigger>
        )}

        <DialogContent className="flex flex-col gap-3 justify-center w-64 h-52 rounded-lg">
          <p className="text-lg font-medium">
            Tem certeza que deseja excluir o jogador?
          </p>
          <div className="flex gap-3">
            <DialogClose>
              <Button className="bg-gray-500 text-gray-100 font-medium">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                className="bg-red-500 text-gray-100 font-medium"
                onClick={handleRemovePlayer}
              >
                Excluir
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
