import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ProfileInfoProps } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import { FiPlus, FiUser } from 'react-icons/fi';

export function ProfileInfo({ data }: ProfileInfoProps) {
    return (
        <div className="bg-card text-card-foreground rounded-xl border shadow-sm">
            <div className="px-24 py-10">
                <Link href="/personel" className="mb-6 flex items-center justify-start">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
                <div className="mb-8 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-2xl font-bold">Perfil de Personal</h1>
                        <p className="text-muted-foreground text-md">Información personal del usuario</p>
                    </div>

                    <Avatar className="h-48 w-48 border-2 border-dashed border-gray-300">
                        <AvatarFallback className="bg-gray-500 text-4xl font-bold text-gray-600" delayMs={0}>
                            MR
                        </AvatarFallback>
                    </Avatar>
                </div>

                <hr className="my-6 border-t border-gray-200" />

                <div className="mt-8 flex grid-cols-2 justify-between pr-10">
                    <div className="flex gap-2">
                        <FiUser className="size-6" />
                        <h2 className="mb-6 text-xl font-semibold">Información Personal</h2>
                    </div>
                    <Button asChild className="rounded-xl bg-[#1e9483] px-12 py-6 text-base text-white shadow-sm hover:bg-[#1e9483]/90">
                        <Link href={route('personel.edit', { id: data?.id })}>
                            <FiPlus />
                            Editar Perfil
                        </Link>
                    </Button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-y-1 md:grid-cols-2 md:gap-x-10 md:gap-y-8">
                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Nombre</div>
                        <div className="w-80 rounded-xl border-1 border-gray-300 bg-white p-3 text-lg shadow-sm">{data?.nombre}</div>
                    </div>
                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Cedula</div>
                        <div className="w-80 rounded-xl border-1 border-gray-300 bg-white p-3 text-lg shadow-sm">{data?.cedula}</div>
                    </div>

                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Teléfono</div>
                        <div className="w-80 rounded-xl border-1 border-gray-300 bg-white p-3 text-lg shadow-sm">{data?.telefono}</div>
                    </div>
                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Correo Electrónico</div>
                        <div className="w-80 rounded-xl border-1 border-gray-300 bg-white p-3 text-lg shadow-sm">{data?.email}</div>
                    </div>

                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Cargo</div>
                        <div className="w-80 rounded-xl border-1 border-gray-300 bg-white p-3 text-lg shadow-sm">{data?.cargo}</div>
                    </div>
                    <div className="space-y-3">
                        <div className="font-medium text-gray-500">Departamento</div>
                        <div className="w-80 rounded-xl border-1 border-gray-300 bg-white p-3 text-lg shadow-sm">{data?.departamento}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
