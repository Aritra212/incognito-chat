import { IUser } from "@/common/common.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical } from "lucide-react";

type Props = {
  partner: IUser;
};
export default function ChatHeader({ partner }: Props) {
  return (
    <div className="flex gap-x-4 items-center rounded-2xl  p-2 w-full bg-primary">
      <Avatar className="w-10 h-10 bg-background">
        <AvatarImage src={partner?.avatar_url || ""} />
        <AvatarFallback className="text-primary font-semibold">
          {partner?.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="text-xl capitalize flex items-center gap-6">
          <p>
            {partner?.name} (
            <span className="text-sm text-foreground/70">
              ~{partner?.user_name}
            </span>
            )
          </p>
          <span className="cursor-pointer hover:bg-background p-1 rounded">
            <EllipsisVertical className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
