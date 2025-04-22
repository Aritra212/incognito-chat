"use client";

import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { IConversationData } from "@/common/common.interface";
import { createClient } from "@/utils/supabase/client";
import { fetchAllConversations } from "@/utils/data-access/conversations";

export interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
  conversations: IConversationData[];
  setConversations: (Conversations: IConversationData[]) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  conversations: [],
  setConversations: () => {},
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
  const [conversationsData, setConversationsData] = useState<
    IConversationData[]
  >(conversations || []);
  const getConversations = async () => {
    const { data } = await fetchAllConversations(user?.id || "");

    if (data) {
      setConversationsData(data);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          schema: "public",
          table: "notifications",
          event: "UPDATE",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload) {
            getConversations();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, user?.id, conversationsData]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          user,
          setUser,
          conversations: conversationsData,
          setConversations: setConversationsData,
        }}
      >
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
