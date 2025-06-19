'use client';
import InputError from '@/components/input-error';
import { LocationFormData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function EditLocationForm(props?: LocationFormData) {
    const { data, setData, put, processing, errors } = useForm<Required<LocationFormData>>(props ?? { name: '', code: '', level: 1 });
    const id = usePage().url.split('/').slice(-1)[0];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('location.update', { id }));
    };

    return (
        <section className="min-h-screen items-center justify-center">
            <form className="w-full max-w-6xl" onSubmit={submit}>
                {/* Header */}
                <div className="flex h-[100px] flex-col items-center justify-center rounded-2xl border-b border-b-gray-200 bg-white text-center">
                    <div className="text-2xl leading-8 font-bold text-neutral-900">Editar Ubicación</div>
                    <div className="text-sm leading-5 text-slate-500">Modifique los datos necesarios</div>
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
                            className="w-full rounded-[8px] border border-zinc-200 bg-gray-100 px-2 py-2 text-base text-neutral-900 focus:outline-none"
                            placeholder="Código"
                            disabled
                        />
                        <InputError message={errors.code} />
                    </div>

                    <div className="flex w-100 flex-col gap-2.5">
                        <label htmlFor="level" className="flex items-center gap-2 text-center text-sm font-medium text-neutral-900">
                            Nivel <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="level"
                            type="number"
                            value={data.level}
                            onChange={(e) => setData('level', Number(e.target.value))}
                            className="w-full rounded-[8px] border border-zinc-200 bg-gray-100 px-2 py-2 text-base text-neutral-900 focus:outline-none"
                            placeholder="Nivel"
                            disabled
                        />
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
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </section>
    );
}
