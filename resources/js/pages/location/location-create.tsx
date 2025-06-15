import { AppSidebar } from '@/components/app-sidebar';
import { StoreLocationForm } from '@/components/location/forms/store-location-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { LocationProps } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link } from '@inertiajs/react';

export default function LocationCreate({ user, navMain, navSecondary }: LocationProps) {
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
                            <Link href={route('location.index')} className="transition hover:cursor-pointer hover:bg-zinc-200">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Link>
                            <h1>Formulario para crear una nueva ubicaion</h1>
                            <StoreLocationForm />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
