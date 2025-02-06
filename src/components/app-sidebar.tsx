"use client";
import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
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
      <SidebarContent>
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
        <SidebarSeparator className="mx-0" />
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center w-full">
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
    </Sidebar>
  );
}
