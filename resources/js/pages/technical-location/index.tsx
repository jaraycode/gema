import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { TechnicalLocationTable } from '@/components/TechnicalLocation-table';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TechnicalLocationPaginatedProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

export default function TechnicalLocationIndex({ user, navMain, navSecondary, data }: TechnicalLocationPaginatedProps) {
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
                                <Card className="rounded-lg bg-white shadow-md bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                                    <CardContent>
                                        <TechnicalLocationTable data={data.data} />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
