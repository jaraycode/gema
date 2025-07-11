import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'; // Importar Card
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLayout } from '@/layouts/app-layout';
import { DepartmentEditProps, DepartmentFormModel } from '@/types/department/department';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function DepartmentEdit({ user, navMain, navSecondary, department }: DepartmentEditProps) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<DepartmentFormModel>>(
        department ?? {
            name: '',
            code: '',
        },
    );
    const id = usePage().url.split('/').slice(-1)[0];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('department.update', { id }), {
            onFinish: () => reset('code'),
        });
    };

    return (
        <AppLayout user={user} navMain={navMain} navSecondary={navSecondary} title="Departamento">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-10 lg:px-25">
                        <Card className="rounded-xl bg-white px-14 py-7 pb-10 text-left shadow-md">
                            {' '}
                            {/* Usar Card */}
                            <div className="flex items-center justify-between">
                                <Link href={route('department.index')} className="inline-block text-sm text-gray-500 hover:text-gray-700">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </Link>
                            </div>
                            <h1 className="mb-4 text-center text-2xl font-bold">Editar Departamento</h1>
                            <p className="mb-5 text-center text-gray-600">Complete la información del Departamento</p>
                            <form onSubmit={submit} className="space-y-8 border-t-1 pt-7">
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <Label htmlFor="codigo">Abreviatura</Label>
                                            <Input
                                                id="code"
                                                value={data.code}
                                                onChange={(e) => setData('code', e.target.value)}
                                                placeholder="Código del Departamento"
                                                maxLength={6}
                                                max={6}
                                                className="rounded-[8px] border border-zinc-200 bg-white py-7 text-base text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                                                disabled
                                            />
                                            <InputError message={errors.code} />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="nombre">Nombre</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Nombre del Departamento"
                                                required
                                                className="rounded-[8px] border border-zinc-200 bg-white py-7 text-base text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-15 flex justify-center gap-4 border-b-1 pb-6">
                                    <Link href={route('department.index')}>
                                        <Button type="button" className="h-12 w-10 rounded-xl border-gray-500 bg-gray-200 px-36 hover:bg-gray-300/90">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        className="h-12 w-10 rounded-xl bg-[#1e9483] px-36 text-white hover:bg-[#1e9483]/90"
                                        disabled={processing}
                                    >
                                        Actualizar Departamento
                                    </Button>
                                </div>
                            </form>
                        </Card>{' '}
                        {/* Cerrar Card */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
