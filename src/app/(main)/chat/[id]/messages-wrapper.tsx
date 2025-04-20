"use client";

import { IChatData } from "@/common/common.interface";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useMemo } from "react";

type Props = {
  children: React.ReactNode;
  data: IChatData[];
  className?: string;
};

export default function MessagesWrapper({
  children,
  data = [],
  className,
}: Props) {
  const supabase = useMemo(() => createClient(), []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const conversationId = data[0]?.conversation_id;

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel("chats")
      .on(
        "postgres_changes",
        {
          schema: "public",
          table: "chats",
          event: "*",
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => router.refresh()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      wrapperRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [data.length]);

  return (
    <div className={className}>
      {children}
      <div ref={wrapperRef} />
      {/* <span className="bottom-0 left-[var(--sidebar-width)] z-10 fixed bg-gradient-to-b from-input/5 to-transparent backdrop-blur-3xl w-[calc(100%-var(--sidebar-width)-1rem)] h-14" /> */}
    </div>
  );
}
