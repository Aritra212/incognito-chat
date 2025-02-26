"use client";

import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { IConversationData } from "@/common/common.interface";
import { createClient } from "@/utils/supabase/client";
// import { fetchAllConversations } from "@/utils/data-access/conversations";
import { useRouter } from "next/navigation";

export interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
  conversations: IConversationData[];
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  conversations: [],
});

type Props = {
  children: React.ReactNode;
  userData: User;
  conversations: IConversationData[];
};

const queryClient = new QueryClient();

export default function UserContextProvider({
  userData,
  children,
  conversations,
}: Props) {
  const [user, setUser] = useState<User | null>(userData ?? null);
  const supabase = createClient();
  const router = useRouter();

  // const getConversations = async () => {
  //   const conversations = await fetchAllConversations(user?.id || "");

  //   if (conversations) {
  //     console.log(conversations);
  //   }
  // };

  useEffect(() => {
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          schema: "public",
          table: "notifications",
          event: "UPDATE",
          filter: `user_id=eq.${user?.id}`,
        },
        async (payload) => {
          if (payload) {
            // getConversations();
            router.refresh();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser, conversations }}>
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
