import { AppSidebar } from '@/components/app-sidebar';
import { LocationForm } from '@/components/location/forms/store-location-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { LocationProps } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head } from '@inertiajs/react';

export default function LocationIndex({ user, navMain, navSecondary }: LocationProps) {
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
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <a href={route('location.index')} className="transition hover:cursor-pointer hover:bg-zinc-200">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </a>
                            <h1>Formulario para crear una nueva ubicaion</h1>
                            <LocationForm />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
