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
        <main>
          <SidebarProvider>
            <AppSidebar />
            <main className="h-[calc(100dvh-5rem)] w-full flex px-2 py-4 gap-x-2">
              <SidebarTrigger />
              <div className="flex justify-center items-center h-full w-full">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </main>
      </UserContextProvider>
    </Protected>
  );
}
