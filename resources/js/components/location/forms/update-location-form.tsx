'use client';
import InputError from '@/components/input-error';
import { LocationFormData } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function EditLocationForm(props?: LocationFormData) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<LocationFormData>>(props ?? { name: '', code: '', level: '' });
    const id = usePage().url.split('/').slice(-1)[0];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('location.update', { id: id }), {
            onFinish: () => reset('code'),
        });
    };

    return (
        <section className="h-full items-center justify-center">
            <form className="w-full" onSubmit={submit}>
                {/* Header */}
                <Link href={route('location.index')} className="ml-10 hover:cursor-pointer">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
                <div className="flex h-[100px] flex-col items-center justify-center rounded-2xl border-b border-b-gray-200 bg-white text-center">
                    <div className="text-2xl leading-8 font-bold text-neutral-900">Registrar Nueva Ubicación</div>
                    <div className="text-sm leading-5 text-slate-500">Complete la información de la ubicación</div>
                </div>

                {/* Inputs */}
                <div className="mt-6 flex flex-col items-center gap-10 px-5">
                    <div className="flex w-100 flex-col gap-2.5">
                        <label htmlFor="name" className="flex items-center gap-2 text-center text-sm font-medium text-neutral-900">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded-[8px] border border-zinc-200 bg-white px-2 py-2 text-base text-neutral-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Ingresa el nombre"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="flex w-100 flex-col gap-2.5">
                        <label htmlFor="code" className="flex items-center gap-2 text-center text-sm font-medium text-neutral-900">
                            Código <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="code"
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className="w-full rounded-[8px] border border-zinc-200 bg-zinc-300 px-2 py-2 text-base text-neutral-900 hover:cursor-not-allowed focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Ingresa el código"
                            disabled
                        />
                        <InputError message={errors.code} />
                    </div>

                    <div className="flex w-100 flex-col gap-2.5">
                        <label htmlFor="level" className="flex items-center gap-2 text-center text-sm font-medium text-neutral-900">
                            Nivel <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="level"
                            id="level"
                            value={data.level}
                            onChange={(e) => setData('level', e.target.value)}
                            className="w-full rounded-[8px] border border-zinc-200 bg-zinc-300 px-2 py-2 text-base text-neutral-900 hover:cursor-not-allowed focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            disabled
                        >
                            <option value="" disabled hidden>
                                Seleccione un nivel
                            </option>
                            <option value={1}>Módulo</option>
                            <option value={2}>Piso</option>
                            <option value={3}>Área</option>
                            <option value={4}>Equipo</option>
                        </select>
                        <InputError message={errors.level} />
                    </div>
                </div>

                {/* Botones */}
                <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col gap-4 md:flex-row">
                    <button
                        type="button"
                        className="h-10 w-full rounded-xl bg-gray-100 text-base text-slate-500 transition-colors hover:bg-gray-200"
                        onClick={() => (window.location.href = route('location.index'))}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="h-10 w-full rounded-xl bg-teal-600 text-base text-white transition-colors hover:bg-teal-700"
                        disabled={processing}
                    >
                        Crear Ubicación
                    </button>
                </div>
            </form>
        </section>
    );
}
