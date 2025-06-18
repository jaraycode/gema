import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { TechnicalLocationTable } from '@/components/TechnicalLocation-table';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TechnicalLocationProps } from '@/types';
import { Head } from '@inertiajs/react';

const fakeData = [
    { id: '1', name: 'Ubicación Técnica 1' },
    { id: '2', name: 'Ubicación Técnica 2' },
    { id: '3', name: 'Ubicación Técnica 3' },
];

export default function TechnicalLocationIndex({ user, navMain, navSecondary }: TechnicalLocationProps) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <Head title="Ubicación técnica" />
            <AppSidebar variant="inset" user={user} navMain={navMain} navSecondary={navSecondary} />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6"></div>
                            <div className="mx-4 grid grid-cols-1 gap-4 md:mx-8">
                                <TechnicalLocationTable data={fakeData} />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
