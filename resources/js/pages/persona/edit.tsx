import { Editform } from '@/components/personel/edit/edit-form';
import { AppLayout } from '@/layouts/app-layout';
import { NavBarProps, PersonnelEditProps } from '@/types';

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
    return (
        <AppLayout user={user} navMain={navMain} navSecondary={navSecondary} title="Personal">
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
