import { AppSidebar } from '@/components/app-sidebar';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { MaintenanceTable } from '@/components/MaintenanceTable';

import { NavBar } from '@/types';
import data from './data.json';

export default function DashboardPage(props: NavBar) {
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
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                            </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 md:mx-8">
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-2">Mantenimiento Pendiente</h2>
                                <MaintenanceTable data={[
                                    { id: '1', date: '2023-10-01', name: 'Equipo A' },
                                    { id: '2', date: '2023-10-05', name: 'Equipo B' },
                                    { id: '3', date: '2023-11-10', name: 'Equipo C' },
                                    { id: '4', date: '2023-11-05', name: 'Equipo B' },
                                    { id: '5', date: '2023-12-10', name: 'Equipo C' },
                                    { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                    { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                    { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                ]} />
                            </div>
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-2">Próximos Mantenimientos</h2>
                                <MaintenanceTable data={[
                                    { id: '1', date: '2023-10-01', name: 'Equipo D' },
                                    { id: '2', date: '2023-10-05', name: 'Equipo E' },
                                    { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                    { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                    { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                    { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                    { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                    { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                ]} />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
