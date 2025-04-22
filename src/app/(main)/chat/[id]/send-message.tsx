"use client";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/ui/rich-text-editor";
import useUser from "@/hooks/use-user";
import { insertChat } from "@/utils/data-access/chats";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  conv_id: string;
};

export default function SendMessage({ conv_id }: Props) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [clear, setClear] = useState<number>(0);

  const { user } = useUser();

  const handleMessageSubmit = async () => {
    setLoading(true);
    const { data: insertedChat, error } = await insertChat({
      conversation_id: conv_id || "",
      message,
      sender_id: user!.id,
    });

    if (error) toast.error("Message Sending Error: " + error);

    if (insertedChat) {
      setMessage("");
      setClear((prev) => prev + 1);
    }

    setLoading(false);
  };

  return (
    <div className="right-0 bottom-2 left-0 z-20 sticky">
      <div className={"relative bg-primary rounded-2xl w-full overflow-hidden"}>
        <RichTextEditor
          onValueChange={setMessage}
          content={message}
          className={
            "bg-transparent backdrop-blur-none min-h-8 max-h-[60vh] bottom-2 overflow-auto shadow-none"
          }
          clear={clear}
        />

        <div className="flex justify-end items-center px-2 pb-2">
          <Button
            className="rounded-full hover:bg-popover/40"
            size={"icon"}
            disabled={!message || message == "<p></p>" || loading}
            onClick={handleMessageSubmit}
            loading={loading}
          >
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </div>
  );
}
