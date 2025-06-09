import { AppSidebar } from '@/components/app-sidebar';
import { MaintenanceTable } from '@/components/maintance-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function DashboardPage(props: NavBarProps) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <Head title="Dashboard" />
            <AppSidebar variant="inset" user={props.user} navMain={props.navMain} navSecondary={props.navSecondary} />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="px-4 lg:px-6"></div>
                            <div className="mx-4 grid grid-cols-1 gap-4 md:mx-8 md:grid-cols-2">
                                <div className="rounded-lg bg-white p-4 shadow-md">
                                    <h2 className="mb-2 text-lg font-semibold">Mantenimiento Pendiente</h2>
                                    <MaintenanceTable
                                        data={[
                                            { id: '1', date: '2023-10-01', name: 'Equipo A' },
                                            { id: '2', date: '2023-10-05', name: 'Equipo B' },
                                            { id: '3', date: '2023-11-10', name: 'Equipo C' },
                                            { id: '4', date: '2023-11-05', name: 'Equipo B' },
                                            { id: '5', date: '2023-12-10', name: 'Equipo C' },
                                            { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                            { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                            { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                        ]}
                                    />
                                </div>
                                <div className="rounded-lg bg-white p-4 shadow-md">
                                    <h2 className="mb-2 text-lg font-semibold">Próximos Mantenimientos</h2>
                                    <MaintenanceTable
                                        data={[
                                            { id: '1', date: '2023-10-01', name: 'Equipo D' },
                                            { id: '2', date: '2023-10-05', name: 'Equipo E' },
                                            { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                            { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                            { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                            { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                            { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                            { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
