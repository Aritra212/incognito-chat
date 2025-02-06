import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2 h-[calc(100dvh-5rem)] w-full">
        <SidebarTrigger />
        <div className="flex justify-center items-center h-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
