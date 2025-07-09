import { Editform } from '@/components/personel/edit/edit-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AppLayout } from '@/layouts/app-layout';
import { NavBarProps, PersonnelEditProps, ResponseHandlerProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Departments {
    id: number;
    name: string;
    code: string;
}

interface EditPersonelPageProps extends NavBarProps {
    personnel: PersonnelEditProps;
    departamentos: Departments[];
}

export default function EditPersonelPage({ personnel, departamentos, navMain, navSecondary, user }: EditPersonelPageProps) {
    const { flash } = usePage<ResponseHandlerProps>().props;
    const flashMessage = flash?.error ?? flash?.success;
    const [showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        setShowAlert(flashMessage ? true : false);
        setTimeout(() => setShowAlert(false), 3000);
    }, [setShowAlert, flashMessage]);
    return (
        <AppLayout user={user} navMain={navMain} navSecondary={navSecondary} title="Personal">
            {showAlert && flashMessage && (
                <Alert variant={'default'} className={`${flash?.success ? 'bg-[#1E9483]' : 'bg-red-800'}`}>
                    <AlertTitle className="font-bold text-white">{flash?.success ? 'Éxito!' : 'Error!'}</AlertTitle>
                    <AlertDescription className="text-white">{flash?.success ?? flash?.error}</AlertDescription>
                </Alert>
            )}
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-10 lg:px-25">
                        <Editform departments={departamentos} personnel={personnel} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
