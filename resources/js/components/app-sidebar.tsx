// import { IconDashboard, IconHelp, IconReport, IconSettings, IconUser } from '@tabler/icons-react';
import * as React from 'react';

import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavBar } from '@/types';

type AppSidebarProps = NavBar & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ user, navMain, navSecondary, ...props }: AppSidebarProps) {
    const navUser = { name: user.name, email: user.email, avatar: user.avatar };
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <a href="#" className="flex justify-center">
                            <img src="/images/gemaLogo.png" alt="Logo de Gema" className="h-20 w-auto" />
                        </a>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton className="py-6" isActive={item.isActive} asChild>
                                <a href={item.href}>
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
                    {navSecondary.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton className="py-6" asChild>
                                <a href={item.href}>
                                    {/* <item.icon /> */}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <NavUser user={navUser} />
            </SidebarFooter>
        </Sidebar>
    );
}
