import { AppSidebar } from '@/components/app-sidebar';
import { PersonnelCreateForm } from '@/components/personel/create/create-form';
import { SiteHeader } from '@/components/site-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps, ResponseHandlerProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Departments {
    id: number;
    name: string;
    code: string;
}
interface CreatePersonelProps extends NavBarProps {
    departments: Departments[];
    cargos: string[];
}

export default function CreatePersonel({ departments, user, navMain, navSecondary }: CreatePersonelProps) {
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
            <AppSidebar variant="inset" user={user} navMain={navMain} navSecondary={navSecondary} />
            <Head title="Personal" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    {showAlert && flashMessage && (
                        <Alert variant={'default'} className={`${flash?.success ? 'bg-[#1E9483]' : 'bg-red-800'}`}>
                            <AlertTitle className="font-bold text-white">{flash?.success ? 'Éxito!' : 'Error!'}</AlertTitle>
                            <AlertDescription className="text-white">{flash?.success ?? flash?.error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-10 lg:px-25">
                                <PersonnelCreateForm departments={departments} />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
