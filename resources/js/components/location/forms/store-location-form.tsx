'use client';
import InputError from '@/components/input-error';
import { LocationFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function LocationForm() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LocationFormData>>({ name: '', code: '', level: 1 });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('location.store'), {
            onFinish: () => reset('code'),
        });
    };

    return (
        <section className="h-screen w-6/12 max-md:ml-0 max-md:w-full">
            <form className="w-full max-w-md" onSubmit={submit}>
                <div className="text-center">
                    <label htmlFor="email" className="block text-xl leading-[36px)] font-medium text-gray-400 max-md:mt-10">
                        Email
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mx-auto mt-3 h-[40px] w-5/6 border-0 border-b-2 border-solid border-zinc-600 bg-transparent text-black focus:border-zinc-800 focus:outline-none"
                        aria-label="Name"
                        placeholder="Ingresa el nombre"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="mt-8 mb-2 text-center">
                    <label htmlFor="password" className="block text-xl leading-[36px)] font-medium text-gray-400">
                        Código
                    </label>
                    <div className="relative mx-auto mt-3 w-5/6">
                        <input
                            id="code"
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className="h-[40px] w-full border-0 border-b-2 border-solid border-zinc-600 bg-transparent pr-10 text-black focus:border-zinc-800 focus:outline-none"
                            aria-label="Code"
                            placeholder="Ingresa el código"
                        />
                        <InputError message={errors.code} />
                    </div>
                </div>

                <div className="mt-8 mb-2 text-center">
                    <label htmlFor="password" className="block text-xl leading-[36px)] font-medium text-gray-400">
                        Nivel
                    </label>
                    <div className="relative mx-auto mt-3 w-5/6">
                        <input
                            id="level"
                            type="text"
                            value={data.level}
                            onChange={(e) => setData('level', Number(e.target.value))}
                            className="h-[40px] w-full border-0 border-b-2 border-solid border-zinc-600 bg-transparent pr-10 text-black focus:border-zinc-800 focus:outline-none"
                            aria-label="Level"
                            placeholder="Ingresa el nivel"
                        />
                        <InputError message={errors.level} />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="disabled: mt-6 mb-5 cursor-pointer rounded-[31px] border-2 border-[#1E9483] bg-[#1E9483] p-2 px-10 leading-[36px)] text-white transition disabled:cursor-not-allowed disabled:border-[#324d49] disabled:bg-[#324d49] max-md:mt-10 max-md:px-5"
                >
                    Guardar
                </button>
            </form>
        </section>
    );
}
