import { AppSidebar } from '@/components/app-sidebar';
import { Editform } from '@/components/personel/edit/edit-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps, PersonnelStoreProps } from '@/types';

interface Departments {
    id: number;
    name: string;
    code: string;
}

interface EditPersonelPageProps extends NavBarProps {
    personnel: PersonnelStoreProps;
    departamentos: Departments[];
}

export default function EditPersonelPage({ personnel, departamentos, navMain, navSecondary, user }: EditPersonelPageProps) {
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

            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-10 lg:px-25">
                                <Editform departments={departamentos} personnel={personnel} />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
