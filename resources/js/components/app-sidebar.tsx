import * as React from "react"
import {
  IconDashboard,
  IconReport,
  IconSettings,
  IconHelp,
  IconUser,
} from "@tabler/icons-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
      isActive: true,
    },
    {
      title: "Reportes",
      url: "#",
      icon: IconReport,
    },
    {
      title: "Personal",
      url: "#",
      icon: IconUser,
    },
    {
      title: "Departamento",
      url: "#",
      icon: IconUser,
    },
    {
      title: "Equipo",
      url: "#",
      icon: IconUser,
    },
  ],
  navSecondary: [
    {
      title: "Obtener Ayuda",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
             <a href="#" className="flex justify-center">
                <img
                    src="/images/gemaLogo.png"
                    alt="Logo de Gema"
                    className="h-20 w-auto"
                />
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}> 
              <SidebarMenuButton className="py-6" isActive={item.isActive} asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {data.navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}> 
              <SidebarMenuButton className="py-6" asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
