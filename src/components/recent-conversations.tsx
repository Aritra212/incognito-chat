import useUser from "@/hooks/use-user";
import Show from "./ui/show";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import ConversationProfileShort from "./conversation-profile-short";
import Link from "next/link";

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
          <Button size={"sm"} className="w-fit mx-auto">
            Create <Plus />
          </Button>
        </div>
      </Show>
      {conversations?.map((conv) => (
        <Link key={conv.id} href={`/chat/${conv.id}`}>
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
