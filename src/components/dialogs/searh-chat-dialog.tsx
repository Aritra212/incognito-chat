"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import useUser from "@/hooks/use-user";
import Link from "next/link";

export default function SearchChatDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { conversations } = useUser();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search a chat</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search by username or email..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {conversations?.map((conv) => (
              <Link href={`/chat/${conv.id}`} key={conv.id}>
                <CommandItem onSelect={() => setIsOpen(false)}>
                  {conv.user?.name}
                </CommandItem>
              </Link>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
