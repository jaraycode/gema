import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card'; // Importar Card
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LocationStoreFormData } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function StoreLocationForm() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LocationStoreFormData>>({
        name: '',
        code: '',
        level: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('location.store'), {
            onFinish: () => reset('code'),
        });
    };

    return (
        <Card className="mx-auto rounded-xl bg-white px-14 py-7 pb-10 shadow-md">
            {' '}
            {/* Usar Card */}
            <Link href={route('location.index')} className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
            <h1 className="mb-4 text-center text-2xl font-bold">Registrar Nueva Ubicación</h1>
            <p className="mb-5 text-center text-gray-600">Complete la información de la ubicación</p>
            <form onSubmit={submit} className="space-y-8 border-t pt-7">
                <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                    {/* Nombre */}
                    <div className="space-y-3">
                        <label htmlFor="name" className="block text-left text-sm font-medium text-neutral-900">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Nombre"
                            className="rounded-[8px] border border-zinc-200 bg-white py-7 text-base text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Código */}
                    <div className="space-y-3">
                        <label htmlFor="code" className="block text-left text-sm font-medium text-neutral-900">
                            Código <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="code"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            placeholder="Ingresa el código"
                            className="rounded-[8px] border border-zinc-200 bg-white py-7 text-base text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                        />
                        <InputError message={errors.code} />
                    </div>

                    {/* Nivel */}
                    <div className="space-y-3">
                        <label htmlFor="level" className="block text-left text-sm font-medium text-neutral-900">
                            Nivel <span className="text-red-500">*</span>
                        </label>
                        <Select onValueChange={(value) => setData('level', value as string)} value={data.level as string} required>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Seleccione un nivel" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                <SelectItem value="1" className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black">
                                    Edificio
                                </SelectItem>
                                <SelectItem value="2" className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black">
                                    Piso
                                </SelectItem>
                                <SelectItem value="3" className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black">
                                    Área
                                </SelectItem>
                                <SelectItem value="4" className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black">
                                    Equipo
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.level} />
                    </div>
                </div>

                {/* Botones */}
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href={route('location.index')}
                        className="flex h-12 items-center justify-center rounded-xl bg-gray-200 px-36 text-base text-gray-700 transition hover:bg-gray-300"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="h-12 rounded-xl bg-[#1e9483] px-36 text-base text-white transition hover:bg-[#1e9483]/90"
                        disabled={processing}
                    >
                        Crear Ubicación
                    </button>
                </div>
            </form>
        </Card>
    );
}
