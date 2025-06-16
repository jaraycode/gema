import { AppSidebar } from '@/components/app-sidebar';
import { PersonelTable } from '@/components/personel/personel-table';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps } from '@/types';

// Datos de ejemplo
const personelData = [
    {
        id: '1',
        fecha: '2024-11-01',
        cedula: '26.385.482',
        nombre: 'Pedro Jubento',
        cargo: 'Jefe',
        departamento: 'SGMREF',
        telefono: '04147691677',
    },
    {
        id: '2',
        fecha: '2023-04-10',
        cedula: '28.385.422',
        nombre: 'Maria Acosta',
        cargo: 'Supervisor',
        departamento: 'SGMREF',
        telefono: '04147691677',
    },
    {
        id: '3',
        fecha: '2025-07-16',
        cedula: '26.385.442',
        nombre: 'Jero Cruz',
        cargo: 'Supervisor',
        departamento: 'SGMREF',
        telefono: '04147691677',
    },
];

export default function PersonelPage(props: NavBarProps) {
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
                            <div className="px-4 lg:px-6">
                                <PersonelTable
                                    data={personelData.map((p) => ({
                                        id: p.id,
                                        date: p.fecha,
                                        cedula: p.cedula,
                                        name: p.nombre,
                                        position: p.cargo,
                                        department: p.departamento,
                                        phone: p.telefono,
                                    }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
