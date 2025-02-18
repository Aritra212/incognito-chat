"use client";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Plus,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import ProfileShort from "./profile-short";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader
        className={cn("transition-all", !isCollapsed && "p-4 flex")}
      >
        <ProfileShort
          name="Aritra Paul"
          userName="Aritra212"
          editProfile="/profile"
          isCollapsed={isCollapsed}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center w-full border-t-2 border-border/20 rounded-none">
            <p>Recent Conversations</p>
            <div className="flex gap-x-2 items-center">
              <Search className="w-4 h-4 cursor-pointer" />
              <Plus className="w-4 h-4 cursor-pointer" />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-x-2 cursor-pointer">
                <LogOut className="w-4 h-4" />
                <p>Log Out</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
