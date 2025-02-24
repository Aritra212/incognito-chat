import CreateChatDialog from "@/components/dialogs/create-chat-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center gap-y-2 p-10 bg-primary/40 rounded-3xl">
        <p className="font-medium text-xl">Start a new conversation</p>
        <CreateChatDialog>
          <Button size={"lg"} className="w-fit mx-auto">
            Create <Plus />
          </Button>
        </CreateChatDialog>
      </div>
    </div>
  );
}
