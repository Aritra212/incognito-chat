import React from "react";
import { IChatData } from "@/common/common.interface";
import { Card, CardContent } from "@/components/ui/card";
import ProfileShort from "@/components/profile-short";
import { cn } from "@/lib/utils";
import RichTextEditor from "@/components/ui/rich-text-editor";

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
        <div className="w-4/5 sm:w-3/5 md:w-1/2 space-y-1.5">
          <Card className="border-none">
            <CardContent
              className={cn(
                "p-0 bg-primary rounded-xl",
                isCurrentUser ? "rounded-br-none" : "rounded-bl-none"
              )}
            >
              <RichTextEditor
                content={chatData?.message}
                readOnly
                className={cn("min-h-0 bg-transparent py-2")}
              />
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
