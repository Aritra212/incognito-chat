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

export default function SearchChatDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search a chat</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>Search by username or email</p>
          <div className="flex gap-2 justify-center mb-4">
            <Input
              type="search"
              placeholder="enter username or email"
              //   onChange={(e) => setUserData(e.target.value)}
              //   onKeyDown={(e) => {
              //     if (e.key === "Enter") handleCretate();
              //   }}
            />
            <Button
              size={"lg"}
              //   onClick={handleCretate}
              //   disabled={loading}
              //   loading={loading}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
