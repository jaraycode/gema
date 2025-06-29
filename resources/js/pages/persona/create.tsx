import { AppSidebar } from '@/components/app-sidebar';
import { Createform } from '@/components/personel/create/create-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps } from '@/types';
import { useForm } from '@inertiajs/react';

interface Departments{
    id: number;
    name: string;
    code: string
}
interface CreatePersonelProps extends NavBarProps {
    departamentos: Departments[];
    cargos: string[];
}

export default function CreatePersonel(props: CreatePersonelProps) {
    const { post, processing } = useForm();

    const handleSubmit = (formData: any) => {
        const transformedData = {
            email: formData.email,
            phone_number: formData.telefono,
            first_name: formData.nombre.split(' ')[0] || '',
            last_name: formData.nombre.split(' ').slice(1).join(' ') || '',
            username: formData.email.split('@')[0],
            password: 'password123',
            department: formData.department
        };

        post(route('personel.store', transformedData));
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
