import { AppSidebar } from '@/components/app-sidebar';
import { ProfileInfo } from '@/components/personel/profile/profileInfo';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps } from '@/types';

// Datos de ejemplo corregidos
const profileData = {
    nombre: 'José Pérez',
    cedula: '23.687.367',
    telefono: '0414-18246657',
    email: 'josep@gmail.com',
    cargo: 'Jefe de Departamento',
    departamento: 'SGMREF',
};

export default function ProfilePage(props: NavBarProps) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" user={props.user} navMain={props.navMain} navSecondary={props.navSecondary} />

            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="mx-auto max-w-4xl px-4 lg:px-6">
                                <ProfileInfo data={profileData} />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
