import useUser from "@/hooks/use-user";
import Show from "./ui/show";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import ConversationProfileShort from "./conversation-profile-short";
import Link from "next/link";
import CreateChatDialog from "./dialogs/create-chat-dialog";

export default function RecentConversationList() {
  const { conversations } = useUser();
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";

  return (
    <>
      <Show when={!conversations.length && !isCollapsed}>
        <div className="space-y-2 flex flex-col justify-center">
          <p className="text-center mt-10 text-muted-foreground">
            No conversation found
          </p>
          <CreateChatDialog>
            <Button size={"lg"} className="w-fit mx-auto">
              Create <Plus />
            </Button>
          </CreateChatDialog>
        </div>
      </Show>
      {conversations?.map((conv) => (
        <Link key={conv.id} href={`/chat/${conv.id}`} prefetch>
          <ConversationProfileShort
            lastMessage={conv.last_message}
            name={conv.user.name}
            isCollapsed={isCollapsed}
          />
        </Link>
      ))}
    </>
  );
}
