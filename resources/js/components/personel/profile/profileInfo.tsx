import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FiPlus, FiUser } from 'react-icons/fi';

interface ProfileInfoProps {
    data: {
        nombre: string;
        cedula: string;
        telefono: string;
        email: string;
        cargo: string;
        departamento: string;
    };
}

export function ProfileInfo({ data }: ProfileInfoProps) {
    return (
        <div className="bg-card text-card-foreground rounded-xl border shadow-sm">
            <div className="p-8">
                <div className="mb-8 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-2xl font-bold">Perfil</h1>
                        <p className="text-muted-foreground text-md">Información personal del usuario</p>
                    </div>

                    <Avatar className="h-48 w-48 border-2 border-dashed border-gray-300">
                        <AvatarFallback className="bg-gray-500 text-4xl font-bold text-gray-600" delayMs={0}>
                            MR
                        </AvatarFallback>
                    </Avatar>
                </div>

                <hr className="my-6 border-t border-gray-200" />
                 

                <div className="mt-8 flex justify-between grid-cols-2 pr-5">
                    <div className="flex gap-2">
                        <FiUser className="size-6" />
                        <h2 className="mb-6 text-xl font-semibold">Información Personal</h2>
                    </div>
                     <Button className="px-8 py-2 text-base rounded-xl bg-[#1e9483] text-white hover:bg-[#1e9483]/90 shadow-sm">
                        <FiPlus />
                        Editar Perfil
                     </Button>
                </div>
               
                <div className="grid grid-cols-2 gap-y-1 md:grid-cols-2 md:gap-x-10 md:gap-y-8 mt-5">
                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Nombre</div>
                        <div className="p-3 text-lg bg-white  rounded-xl border-gray-300 border-1 shadow-sm w-80">{data.nombre}</div>
                    </div>
                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Cedula</div>
                        <div className="p-3 text-lg bg-white  rounded-xl border-gray-300 border-1 shadow-sm w-80">{data.cedula}</div>
                    </div>

                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Teléfono</div>
                        <div className="p-3 text-lg bg-white  rounded-xl border-gray-300 border-1 shadow-sm w-80">{data.telefono}</div>
                    </div>
                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Correo Electrónico</div>
                        <div className="p-3 text-lg bg-white  rounded-xl border-gray-300 border-1 shadow-sm w-80">{data.email}</div>
                    </div>

                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Cargo</div>
                        <div className="p-3 text-lg bg-white  rounded-xl border-gray-300 border-1 shadow-sm w-80">{data.cargo}</div>
                    </div>
                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Departamento</div>
                        <div className="p-3 text-lg bg-white  rounded-xl border-gray-300 border-1 shadow-sm w-80">{data.departamento}</div>
                    </div>
                </div>

               
            </div>
        </div>
    );
}
