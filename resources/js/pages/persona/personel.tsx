import { PersonelTable } from '@/components/personel/personel-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AppLayout } from '@/layouts/app-layout';
import { PersonelProps, ResponseHandlerProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function PersonelPage({ user, navMain, navSecondary, personels }: PersonelProps) {
    const transformedData = personels.data.map((item) => ({
        ...item,
        departments: item.departments || 'Sin departamento',
    }));
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
                    <div className="px-4 lg:px-6">
                        <PersonelTable data={transformedData} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
