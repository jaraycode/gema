import { ProfileInfo } from '@/components/personel/profile/profileInfo';
import { AppLayout } from '@/layouts/app-layout';

export default function ProfilePage(props: any) {
    const profileData = props.personel
        ? {
              id: props.personel.id,
              nombre: `${props.personel.first_name} ${props.personel.last_name}`,
              cedula: String(props.personel.dni ?? ''),
              telefono: String(props.personel.phone_number ?? ''),
              email: String(props.personel.email ?? ''),
              cargo: 'Jefe',
              departamento: props.personel.departments[0].code ?? '',
          }
        : null;
    return (
        <AppLayout user={props.user} navMain={props.navMain} navSecondary={props.navSecondary} title="Perfil">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="mx-auto max-w-4xl px-4 lg:px-6">
                        <ProfileInfo data={profileData} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
