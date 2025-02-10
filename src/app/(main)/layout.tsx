import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-[calc(100dvh-5rem)] w-full flex px-2 py-4 gap-x-2">
        <SidebarTrigger />
        <div className="flex justify-center items-center h-full w-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
