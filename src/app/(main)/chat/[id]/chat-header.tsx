import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical } from "lucide-react";

type Props = {
  name: string;
  userName: string;
  avatar?: string;
};
export default function ChatHeader({ name, avatar, userName }: Props) {
  return (
    <div className="flex gap-x-4 items-center rounded-2xl  p-2 w-full bg-primary ">
      <Avatar className="w-10 h-10 bg-background">
        <AvatarImage src={avatar} />
        <AvatarFallback className="text-primary font-semibold">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="text-xl capitalize flex items-center gap-6">
          <p>
            {name} (
            <span className="text-sm text-foreground/70">~{userName}</span>)
          </p>
          <span className="cursor-pointer hover:bg-background p-1 rounded">
            <EllipsisVertical className="w-4 h-4" />
          </span>
        </div>
        {/* <p className="text-sm text-foreground/70">~ {userName}</p> */}
      </div>
    </div>
  );
}
