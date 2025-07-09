import { AppSidebar } from '@/components/app-sidebar';
import EquipmentEditForm from '@/components/equipment/equipment-edit';
import { SiteHeader } from '@/components/site-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { EquipmentEditFormProps, ResponseHandlerProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function EquipmentEdit({
    user,
    navMain,
    navSecondary,
    equipment_type,
    locations,
    technical_locations,
    props,
}: EquipmentEditFormProps) {
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
            <Head title="Crear equipo" />
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
                            <EquipmentEditForm
                                equipment_type={equipment_type}
                                locations={locations}
                                technical_locations={technical_locations}
                                props={props}
                            />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
