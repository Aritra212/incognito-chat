import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Show from "./ui/show";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  lastMessage: string | null;
  avatar?: string;
  isCollapsed?: boolean;
  notificationCount?: number;
};
export default function ConversationProfileShort({
  name,
  lastMessage,
  avatar,
  isCollapsed = false,
  notificationCount = 0,
}: Props) {
  return (
    <>
      <Show when={!isCollapsed}>
        <Card className="p-2 bg-transparent text-foreground border-none hover:bg-primary/40 cursor-pointer">
          <CardContent className="flex gap-x-2 items-center px-2">
            <Avatar className={cn("w-7 h-7 bg-background font-bold")}>
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-primary">
                {name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center justify-between w-full">
              <div>
                <p>{name}</p>
                <p className="text-xs text-muted-foreground">{lastMessage}</p>
              </div>
              {notificationCount > 0 && (
                <div className="rounded-full py-1 px-2 bg-background text-xs text-center">
                  {notificationCount < 100 ? notificationCount : "99+"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Show>
      <Show when={isCollapsed}>
        <Avatar className="w-8 h-8 bg-background cursor-pointer">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-primary font-semibold">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Show>
    </>
  );
}
