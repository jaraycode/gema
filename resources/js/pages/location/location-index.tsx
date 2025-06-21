import { AppSidebar } from '@/components/app-sidebar';
import { LocationTable } from '@/components/location-table';
import { SiteHeader } from '@/components/site-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { LocationProps, ResponseHandlerProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LocationIndex({ data, user, navMain, navSecondary }: LocationProps) {
    const { flash } = usePage<ResponseHandlerProps>().props;
    const flashMessage = flash?.error ?? flash?.success;
    const [showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        setShowAlert(flashMessage ? true : false);
        setTimeout(() => setShowAlert(false), 3000);
    }, [setShowAlert, flashMessage]);
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
                            <div className="px-4 lg:px-6"></div>
                            <div className="mx-4 grid grid-cols-1 gap-4 md:mx-8">
                                {showAlert && flashMessage && (
                                    <Alert variant={'default'} className={`${flash?.success ? 'bg-[#1E9483]' : 'bg-red-800'}`}>
                                        <AlertTitle className="font-bold text-white">{flash?.success ? 'Éxito!' : 'Error!'}</AlertTitle>
                                        <AlertDescription className="text-white">{flash?.success ?? flash?.error}</AlertDescription>
                                    </Alert>
                                )}
                                <Card className="rounded-lg bg-white shadow-md bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                                    <CardContent>
                                        <LocationTable {...data} />
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
