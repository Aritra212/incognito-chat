import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import Show from "./ui/show";
import { Card, CardContent } from "./ui/card";

type Props = {
  name: string;
  userName: string;
  avatar?: string;
  editProfile?: string;
  isCollapsed?: boolean;
};
export default function ProfileShort({
  name,
  userName,
  avatar,
  editProfile,
  isCollapsed = false,
}: Props) {
  return (
    <>
      <Show when={!isCollapsed}>
        <Card className="py-0 bg-transparent text-foreground border-none">
          <CardContent className="flex justify-between items-center px-2">
            <div className="flex gap-x-2 items-center">
              <Avatar className="w-10 h-10 bg-background">
                <AvatarImage src={avatar} />
                <AvatarFallback className="text-primary font-semibold">
                  {name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="pl-2 text-xl">{name}</p>
                <p className="text-xs">~{userName}</p>
              </div>
            </div>
            <Show when={!!editProfile}>
              <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            </Show>
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
