import { redirectIfSession } from "@/utils/data-access/auth";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  await redirectIfSession();
  return (
    <main className="flex flex-col justify-center items-center py-10 w-full min-h-dvh">
      {children}
    </main>
  );
}
