import { FaPlus } from "react-icons/fa";
import { Button } from "./button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./dialog";
import { Input } from "./input";
import { usePlayers } from "@/contexts/hooks/players-context";

export function NewPlayerButton() {
  const { addNewPlayer, newPlayerName, setNewPlayerName } = usePlayers();

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full flex gap-2 bg-green-500 text-gray-900 text-lg font-medium hover:bg-green-600">
          <span>Novo jogador</span> <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-52 max-w-[25rem] rounded-xl">
        <form
          onSubmit={addNewPlayer}
          className="flex flex-col items-center justify-center gap-3 w-full"
        >
          <label htmlFor="newPlayerName" className="text-lg font-medium">
            Qual é o nome do novo jogador?
          </label>
          <Input
            type="text"
            placeholder="Escreva aqui..."
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <DialogClose className="w-full">
            <Button
              className="w-full flex gap-2 bg-green-500 text-gray-900 text-lg font-medium hover:bg-green-600"
              type="submit"
            >
              <FaPlus />
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
