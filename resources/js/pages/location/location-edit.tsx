import { AppSidebar } from '@/components/app-sidebar';
import { EditLocationForm } from '@/components/location/forms/update-location-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { EditLocationProps } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link } from '@inertiajs/react';

export default function LocationEdit({ user, navMain, navSecondary, data }: EditLocationProps) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <Head title="Ubicación" />
            <AppSidebar variant="inset" user={user} navMain={navMain} navSecondary={navSecondary} />
            <SidebarInset>
                <SiteHeader />
                <div >
                    <div >
                    <div>
                                <button onClick={() => window.history.back()} className="transition hover:cursor-pointer">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                            <EditLocationForm {...data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
