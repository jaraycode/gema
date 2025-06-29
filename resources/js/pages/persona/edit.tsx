import { AppSidebar } from '@/components/app-sidebar';
import { Editform } from '@/components/personel/edit/edit-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useForm } from '@inertiajs/react';

interface Departments {
    id: number;
    name: string;
    code: string;
}

interface EditPersonelPageProps {
    user: any;
    navMain: any[];
    navSecondary: any[];
    personel: any;
    departamentos: Departments[];
}

export default function EditPersonelPage(props: EditPersonelPageProps) {
    const { put, processing } = useForm();

    const handleSubmit = (formData: any) => {
        console.log(formData);
        const [firstName, ...lastNames] = formData.nombre.split(' ');
        const lastName = lastNames.join(' ');

        const transformedData = {
            email: formData.email,
            phone_number: formData.telefono,
            first_name: firstName,
            last_name: lastName,
            department: formData.departamento,
        };

        put(route('personel.update', { id: props.personel.id }), {
            ...transformedData,
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = route('personel.show', { id: props.personel.id });
            },
            onError: (errors) => {
                console.error('Error al actualizar:', errors);
            },
        });
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
                                <Editform
                                    departamentos={props.departamentos}
                                    personel={props.personel}
                                    onSubmit={handleSubmit}
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
