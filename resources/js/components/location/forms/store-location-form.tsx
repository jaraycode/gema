'use client';
import InputError from '@/components/input-error';
import { LocationFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function LocationForm() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LocationFormData>>({
        name: '',
        code: '',
        level: 1,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('location.store'), {
            onFinish: () => reset('code'),
        });
    };

    return (
        <section className="items-center justify-center min-h-screen">
            <form className="w-full max-w-6xl" onSubmit={submit}>
                {/* Header */}
                <div className="bg-white rounded-2xl border-b border-b-gray-200 h-[100px] flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-bold leading-8 text-neutral-900">
                        Registrar Nueva Ubicación
                    </div>
                    <div className="text-sm leading-5 text-slate-500">
                        Complete la información de la ubicación
                    </div>
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-10 mt-6 px-5 items-center">
                    <div className="flex flex-col gap-2.5 w-100">
                        <label htmlFor="name" className="flex gap-2 items-center text-sm font-medium text-neutral-900 text-center">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="px-2 py-2 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                            placeholder="Ingresa el nombre"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="flex flex-col gap-2.5 w-100">
                        <label htmlFor="code" className="flex gap-2 items-center text-sm font-medium text-neutral-900 text-center">
                            Código <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="code"
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className="px-2 py-2 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                            placeholder="Ingresa el código"
                        />
                        <InputError message={errors.code} />
                    </div>

                    <div className="flex flex-col gap-2.5 w-100">
                        <label htmlFor="level" className="flex gap-2 items-center text-sm font-medium text-neutral-900 text-center">
                            Nivel <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="level"
                            type="number"
                            value={data.level}
                            onChange={(e) => setData('level', Number(e.target.value))}
                            className="px-2 py-2 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                            placeholder="Ingresa el nivel"
                        />
                        <InputError message={errors.level} />
                    </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto mt-12">
                    <button
                        type="button"
                        className="h-10 text-base bg-gray-100 rounded-xl text-slate-500 w-full hover:bg-gray-200 transition-colors"
                        onClick={() => window.location.href = route('location.index')}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="h-10 text-base text-white bg-teal-600 rounded-xl w-full hover:bg-teal-700 transition-colors"
                        disabled={processing}
                    >
                        Crear Ubicación
                    </button>
                </div>
            </form>
        </section>
    );
}
