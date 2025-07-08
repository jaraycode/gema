import { AppSidebar } from '@/components/app-sidebar';
import { PersonnelCreateForm } from '@/components/personel/create/create-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps } from '@/types';
import { Head } from '@inertiajs/react';

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
