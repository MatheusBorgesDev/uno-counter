import { FaPlus } from "react-icons/fa";
import { Button } from "./button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./dialog";
import { Input } from "./input";

interface NewPlayerButtonProps {
  handleNewPlayer: (e: React.FormEvent) => void;
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
}

export function NewPlayerButton({
  handleNewPlayer,
  newPlayerName,
  setNewPlayerName,
}: NewPlayerButtonProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full flex gap-2 bg-green-500 text-gray-900 text-lg font-medium hover:bg-green-600">
          <span>Novo jogador</span> <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-52 max-w-[25rem] rounded-xl">
        <form
          onSubmit={handleNewPlayer}
          className="flex flex-col items-center justify-center gap-3 w-full"
        >
          <Input
            type="text"
            placeholder="Nome do novo jogador"
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
