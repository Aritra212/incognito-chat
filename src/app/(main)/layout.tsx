import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/utils/data-access/auth";
import { redirect } from "next/navigation";
import Protected from "@/components/Protected";
import UserContextProvider from "@/components/user-context";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <Protected user={user}>
      <UserContextProvider userData={user}>
        <SidebarProvider>
          <AppSidebar />
          <main className="h-screen flex w-full px-2 py-4 gap-x-2">
            <SidebarTrigger />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </UserContextProvider>
    </Protected>
  );
}
