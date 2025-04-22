import { IUser } from "@/common/common.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleAlert, EllipsisVertical, Trash2 } from "lucide-react";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="rounded-lg w-[--radix-dropdown-menu-trigger-width] min-w-56 text-foreground"
                align="start"
                sideOffset={19}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex gap-x-2 items-center">
                    <Trash2 />
                    Delete Chat
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex gap-x-2 items-center">
                    <CircleAlert /> Block
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
      </div>
    </div>
  );
}
