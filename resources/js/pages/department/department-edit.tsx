import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLayout } from '@/layouts/app-layout';
import { DepartmentEditProps, DepartmentFormModel } from '@/types/department/department';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
        <AppLayout user={user} navMain={navMain} navSecondary={navSecondary}>
            <Head title="Departamento" />
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-10 lg:px-25">
                        <div className="rounded-xl bg-white px-14 py-7 pb-10 text-left shadow-md">
                            <div className="flex items-center justify-between">
                                <Link href="/department" className="inline-block text-sm text-gray-500 hover:text-gray-700">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </Link>
                            </div>
                            <h1 className="mb-4 text-center text-2xl font-bold">Registrar Nuevo Departamento</h1>
                            <p className="mb-5 text-center text-gray-600">Complete la información del Departamento</p>

                            <form onSubmit={submit} className="space-y-8 border-t-1 pt-7">
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <Label htmlFor="codigo">Código</Label>
                                            <Input
                                                id="code"
                                                value={data.code}
                                                onChange={(e) => setData('code', e.target.value)}
                                                placeholder="Código del Departamento"
                                                className="mt-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
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
                                                className="mt-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-15 flex justify-center gap-4 border-b-1 pb-6">
                                    <Link href="/department">
                                        <Button type="button" className="h-12 w-10 rounded-xl border-gray-500 bg-gray-200 px-36 hover:bg-gray-300/90">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        className="h-12 w-10 rounded-xl bg-[#1e9483] px-36 text-white hover:bg-[#1e9483]/90"
                                        disabled={processing}
                                    >
                                        Crear Nuevo Departamento
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
