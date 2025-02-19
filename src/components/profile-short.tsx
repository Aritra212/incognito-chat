import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Show from "./ui/show";
import { Card, CardContent } from "./ui/card";

type Props = {
  name: string;
  userName: string;
  avatar?: string;
  isCollapsed?: boolean;
};
export default function ProfileShort({
  name,
  userName,
  avatar,
  isCollapsed = false,
}: Props) {
  return (
    <>
      <Show when={!isCollapsed}>
        <Card className="py-0 bg-transparent text-foreground border-none">
          <CardContent className="flex gap-x-2 items-center px-2">
            <Avatar className="w-10 h-10 bg-background">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-primary font-semibold">
                {name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl">{name}</p>
              <p className="text-xs text-muted-foreground">{userName}</p>
            </div>
          </CardContent>
        </Card>
      </Show>
      <Show when={isCollapsed}>
        <Avatar className="w-8 h-8 bg-background">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-primary font-semibold">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Show>
    </>
  );
}
