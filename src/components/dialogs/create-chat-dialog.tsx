"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { newConversation } from "@/utils/data-access/conversations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/use-user";
import { IConversationData } from "@/common/common.interface";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function CreateChatDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const router = useRouter();
  const { user, setConversations, conversations } = useUser();

  const handleCreate = async () => {
    setLoading(true);
    const { data, error } = await newConversation(user!.id, userData);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    if (data) {
      toast.success("Chat Room has been created successfully!");
      const updatedConversations = conversations.find((el) => el.id === data.id)
        ? [...conversations]
        : [data as IConversationData, ...conversations];

      setConversations(updatedConversations);
      router.push(`/chat/${data.id}`);
      setIsOpen(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect to a person</DialogTitle>
          <DialogDescription className="sr-only">
            Connect to a person using username or email
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p>Connect by username or email</p>
          <div className="flex gap-2 justify-center mb-4">
            <Input
              type="search"
              placeholder="enter username or email"
              onChange={(e) => setUserData(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
            />
            <Button
              size={"lg"}
              onClick={handleCreate}
              disabled={loading}
              loading={loading}
            >
              Connect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
