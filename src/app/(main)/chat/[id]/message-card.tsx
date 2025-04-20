import React from "react";
import { IChatData } from "@/common/common.interface";
import { Card, CardContent } from "@/components/ui/card";
import ProfileShort from "@/components/profile-short";
import { cn } from "@/lib/utils";

type Props = {
  chatData?: IChatData;
  isCurrentUser: boolean;
};
export default function ChatBox({ chatData, isCurrentUser }: Props) {
  return (
    <div className={cn("flex my-4", isCurrentUser && "justify-end")}>
      <div
        className={cn(
          "w-full flex gap-2 sm:gap-3 items-end",
          isCurrentUser && "flex-row-reverse "
        )}
      >
        <ProfileShort
          name={chatData?.sender_id?.name || ""}
          userName={chatData?.sender_id?.user_name || ""}
          isCollapsed={true}
        />
        <div className="min-w-4/5 sm:min-w-3/5 md:min-w-1/2 space-y-1.5">
          <Card
            className={cn(
              "px-4 py-6  border-none rounded-xl",
              isCurrentUser ? "rounded-br-none" : "rounded-bl-none"
            )}
          >
            <CardContent>
              <p className="text-sm">{chatData?.message}</p>
            </CardContent>
          </Card>
          <p className={cn("text-xs px-4", isCurrentUser && "text-right")}>
            {chatData?.created_at
              ? new Date(chatData.created_at).toLocaleString()
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
