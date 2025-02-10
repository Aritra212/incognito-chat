import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical } from "lucide-react";

type Props = {
  name: string;
  userName: string;
  avatar?: string;
};
export default function ChatHeader({ name, avatar, userName }: Props) {
  return (
    <div className="flex gap-x-4 items-center  pb-3 w-full">
      <Avatar className="w-10 h-10 bg-background">
        <AvatarImage src={avatar} />
        <AvatarFallback className="text-primary font-semibold">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-xl capitalize flex items-center gap-6">
          {name}
          <span className="cursor-pointer hover:bg-accent p-1 rounded">
            <EllipsisVertical className="w-4 h-4" />
          </span>
        </p>
        <p className="text-sm text-foreground/70">~ {userName}</p>
      </div>
    </div>
  );
}
