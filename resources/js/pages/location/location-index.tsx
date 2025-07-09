import { LocationTable } from '@/components/location-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { AppLayout } from '@/layouts/app-layout';
import { LocationProps, ResponseHandlerProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LocationIndex({ data, user, navMain, navSecondary }: LocationProps) {
    const { flash } = usePage<ResponseHandlerProps>().props;
    const flashMessage = flash?.error ?? flash?.success;
    const [showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        setShowAlert(flashMessage ? true : false);
        setTimeout(() => setShowAlert(false), 3000);
    }, [setShowAlert, flashMessage]);
    return (
        <AppLayout user={user} navMain={navMain} navSecondary={navSecondary} title="Ubicación">
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
                        <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-lg border py-6 shadow-sm">
                            <CardContent>
                                <LocationTable {...data} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
