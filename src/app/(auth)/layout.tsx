import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex flex-col justify-center items-center py-10 w-full min-h-dvh">
      {children}
    </main>
  );
}
