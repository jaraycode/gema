// import { IconDashboard, IconHelp, IconReport, IconSettings, IconUser, IconMapPin } from '@tabler/icons-react';
import * as React from 'react';

import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavBarProps } from '@/types';
import { IconAirConditioning, IconBuilding, IconDashboard, IconHelp, IconMapPin, IconReport, IconSettings, IconUser } from '@tabler/icons-react';

type AppSidebarProps = NavBarProps & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ user, navMain, navSecondary, ...props }: AppSidebarProps) {
    const navUser = { name: user.name, email: user.email, avatar: user.avatar };

    const iconMap = {
        IconDashboard: IconDashboard,
        IconReport: IconReport,
        IconUser: IconUser,
        IconSettings: IconSettings,
        IconHelp: IconHelp,
        IconBuilding: IconBuilding,
        IconAirConditioning: IconAirConditioning,
        IconMapPin: IconMapPin,
    };

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
                    {navMain.map((item) => {
                        const Icon = iconMap[item.icon as keyof typeof iconMap] || IconUser;
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton className="py-6" isActive={item.isActive} asChild>
                                    <a href={route(item.href)}>
                                        <Icon className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {navSecondary.map((item) => {
                        const Icon = iconMap[item.icon as unknown as keyof typeof iconMap] || IconUser;
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton className="py-6" asChild>
                                    <a href={route(item.href)} onClick={(e) => e.preventDefault()}>
                                        <Icon className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
                <NavUser user={navUser} />
            </SidebarFooter>
        </Sidebar>
    );
}
