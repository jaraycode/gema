import { AppSidebar } from '@/components/app-sidebar';
import { Createform } from '@/components/personel/create/create-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps } from '@/types';
import { useForm } from '@inertiajs/react';

interface CreatePersonelProps extends NavBarProps {
    departamentos: string[];
    cargos: string[];
}

export default function CreatePersonel(props: CreatePersonelProps) {
    const { post, processing } = useForm();

    const handleSubmit = (formData: any) => {
        post(route('personels.store', formData));
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" user={props.user} navMain={props.navMain} navSecondary={props.navSecondary} />

            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-10 lg:px-25">
                                <Createform
                                    departamentos={props.departamentos}
                                    cargos={props.cargos}
                                    onSubmit={handleSubmit}
                                    onCancel={handleCancel}
                                    processing={processing}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
