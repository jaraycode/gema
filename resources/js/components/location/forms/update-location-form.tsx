'use client';
import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LocationFormData } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function EditLocationForm(props?: LocationFormData) {
    const { data, setData, put, processing, errors } = useForm<Required<LocationFormData>>(props ?? { name: '', code: '', level: '' });
    const id = usePage().url.split('/').slice(-1)[0];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('location.update', { id }));
    };

    return (
        <Card className="mx-auto rounded-xl bg-white px-14 py-7 pb-10 shadow-md">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <Link href={route('location.index')} className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            </div>

            <h1 className="mb-4 text-center text-2xl font-bold">Actualizar Ubicación</h1>
            <p className="mb-6 text-center text-gray-600">Complete la información de la ubicación</p>

            <form onSubmit={submit} className="space-y-8 border-t pt-7">
                <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                    {/* Campos individuales */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ej: Aire acondicionado"
                            className="rounded-xl py-7 text-[#8b8b8b] shadow-sm rounded-[8px] border border-zinc-200 bg-white text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Código <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="code"
                            type="text"
                            value={data.code}
                            placeholder="Ingresa el código"
                            onChange={(e) => setData('code', e.target.value)}
                            disabled
                            className="rounded-xl py-7 text-[#8b8b8b] shadow-sm rounded-[8px] border border-zinc-200 bg-white text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                        />
                        <InputError message={errors.code} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Nivel <span className="text-red-500">*</span>
                        </label>
                        <Select value={data.level?.toString()} onValueChange={(e) => setData('level', e)} required disabled>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Seleccione un nivel" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                <SelectItem value="1">
                                    Edificio
                                </SelectItem>
                                <SelectItem value="2">
                                    Piso
                                </SelectItem>
                                <SelectItem value="3">
                                    Oficina
                                </SelectItem>
                                <SelectItem value="4">
                                    Equipo
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.level} />
                    </div>
                </div>

                {/* Botones */}
                <div className="mt-10 flex justify-center gap-4">
                    <Link
                        href={route('equipment.index')}
                        className="flex h-12 items-center justify-center rounded-xl bg-gray-200 px-36 text-base text-gray-700 transition hover:bg-gray-300"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="h-12 rounded-xl bg-[#1e9483] px-36 text-base text-white transition hover:bg-[#1e9483]/90"
                        disabled={processing}
                    >
                        Actualizar ubicación
                    </button>
                </div>
            </form>
        </Card>
    );
}