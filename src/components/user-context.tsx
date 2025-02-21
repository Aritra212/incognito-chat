"use client";

import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

export interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode;
  userData: User;
};

const queryClient = new QueryClient();

export default function UserContextProvider({ userData, children }: Props) {
  const [user, setUser] = useState<User | null>(userData ?? null);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
