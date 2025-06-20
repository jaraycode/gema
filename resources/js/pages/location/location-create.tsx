import { AppSidebar } from '@/components/app-sidebar';
import { StoreLocationForm } from '@/components/location/forms/store-location-form';
import { SiteHeader } from '@/components/site-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { LocationProps, ResponseHandlerProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LocationCreate({ user, navMain, navSecondary }: LocationProps) {
    const { flash } = usePage<ResponseHandlerProps>().props;
    const flashMessage = flash?.error ?? flash?.success;
    const [showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        setTimeout(() => setShowAlert(false), 3000);
    }, [setShowAlert]);
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
                            {showAlert && flashMessage && (
                                <Alert variant={'default'} className={`${flash?.success ? 'bg-[#1E9483]' : 'bg-red-800'}`}>
                                    <AlertTitle className="font-bold text-white">{flash?.success ? 'Éxito!' : 'Error!'}</AlertTitle>
                                    <AlertDescription className="text-white">{flash?.success ?? flash?.error}</AlertDescription>
                                </Alert>
                            )}
                            <StoreLocationForm />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
