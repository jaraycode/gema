'use client';
import InputError from '@/components/input-error';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type LoginFormData = {
    email: string;
    password: string;
};

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginFormData>>({ email: '', password: '' });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <section className="h-screen w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex h-screen w-full grow flex-col items-center justify-center rounded-none bg-white px-20 py-20 text-center text-base leading-loose max-md:mt-2.5 max-md:max-w-full max-md:px-5 max-md:pb-24">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/33b41968e7754d2b98ae74310dc65b2e/eb0edaf22433bdbc996810229896d4015516b4a6?placeholderIfAbsent=true"
                    alt="Company logo"
                    className="aspect-square w-[120px] max-w-full overflow-hidden object-contain"
                />

                <header className="self-stretch text-5xl font-bold text-black max-md:max-w-full max-md:text-4xl">Bienvenido de Regreso</header>

                <p className="mb-10 leading-[36px)] text-black">Por favor ingresa tus datos</p>

                <form className="w-full max-w-md" onSubmit={submit}>
                    <div className="text-center">
                        <label htmlFor="email" className="block text-xl leading-[36px)] font-medium text-gray-400 max-md:mt-10">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mx-auto mt-3 h-[40px] w-5/6 border-0 border-b-2 border-solid border-zinc-600 bg-transparent text-black focus:border-zinc-800 focus:outline-none"
                            aria-label="Email address"
                            placeholder="Ingresa tu email"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="mt-8 mb-2 text-center">
                        <label htmlFor="password" className="block text-xl leading-[36px)] font-medium text-gray-400">
                            Contraseña
                        </label>
                        <div className="relative mx-auto mt-3 w-5/6">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="h-[40px] w-full border-0 border-b-2 border-solid border-zinc-600 bg-transparent pr-10 text-black focus:border-zinc-800 focus:outline-none"
                                aria-label="Password"
                                placeholder="Ingresa tu contraseña"
                            />
                            <InputError message={errors.password} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>

                    <span className="mt-4 cursor-pointer leading-[36px)] text-gray-400 hover:underline">¿Olvidaste la contraseña?</span>

                    <div className="mt-7">
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 mb-5 cursor-pointer rounded-[31px] border-2 border-[#1E9483] bg-[#1E9483] p-2 px-10 leading-[36px)] text-white max-md:mt-10 max-md:px-5"
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
