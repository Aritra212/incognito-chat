"use client";
import {
  LogOut,
  // MoonStar,
  Plus,
  Search,
  Settings,
  UserPen,
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
import Show from "./ui/show";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./user-context";
import RecentConversationList from "./recent-conversations";
import CreateChatDialog from "./dialogs/create-chat-dialog";
import SearchChatDialog from "./dialogs/searh-chat-dialog";
import LogoutDialog from "./dialogs/logout-dialog";

export function AppSidebar() {
  const sidebar = useSidebar();
  const { user } = useContext(UserContext);
  const isCollapsed = sidebar.state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader
        className={cn(
          "transition-all",
          !isCollapsed && "p-4 flex-row items-center justify-between"
        )}
      >
        <ProfileShort
          name={user?.user_metadata?.name || ""}
          userName={user?.user_metadata?.user_name || ""}
          isCollapsed={isCollapsed}
        />
        <Show when={!isCollapsed}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Settings className="w-4 h-4 text-muted-foreground hover:text-foreground active:rotate-180  cursor-pointer rotate-90 ease-in-out" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="rounded-lg w-[--radix-dropdown-menu-trigger-width] min-w-56"
              side={"right"}
              align="center"
              sideOffset={19}
            >
              <DropdownMenuGroup>
                <Link href={"/profile"}>
                  <DropdownMenuItem className="flex gap-x-2 items-center">
                    <UserPen /> Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <LogoutDialog>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="flex gap-x-2 items-center "
                  >
                    <LogOut className="w-4 h-4" />
                    <p>Log Out</p>
                  </DropdownMenuItem>
                </LogoutDialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Show>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center w-full border-t-2 border-border/20 rounded-none">
            <p>Recent Chats</p>
            <div className="flex gap-x-2 items-center">
              <SearchChatDialog>
                <Search className="w-4 h-4 cursor-pointer" />
              </SearchChatDialog>

              <CreateChatDialog>
                <Plus className="w-4 h-4 cursor-pointer" />
              </CreateChatDialog>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <RecentConversationList />
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
