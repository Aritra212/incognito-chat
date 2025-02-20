"use client";

import { User } from "@supabase/supabase-js";
import { redirect, usePathname, useSearchParams } from "next/navigation";

type Props = {
  user: User | undefined | null;
  children: React.ReactNode;
};

export default function Protected({ user, children }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!user) return redirect(`/login?redirect=${pathname}?${searchParams}`);

  return <>{children}</>;
}
